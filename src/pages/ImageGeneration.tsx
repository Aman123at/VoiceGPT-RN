import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatBar from '../components/ChatBar';
import ImageContent from '../components/ImageContent';
import {fetchImageData} from '../ApiCalls/imageApis';
import {IImages, ImageScreenProps} from '../utils/types';
import {useDispatch, useSelector} from 'react-redux';
import {getImageData, setImageData} from '../redux/slices/imageSlice';
import {getLoaderState, setLoader} from '../redux/slices/commonSlice';
import {
  getSendStateForImage,
  getTextFromVoice,
  setSendForImg,
  setTextFromVoice,
} from '../redux/slices/voiceSlice';

const ImageGeneration = ({navigation}: ImageScreenProps) => {
  const scrollViewRef: any = useRef();
  const imageData = useSelector(getImageData);
  const loader = useSelector(getLoaderState);
  const sendForImage = useSelector(getSendStateForImage);
  const textFromVoice = useSelector(getTextFromVoice);
  const dispatch = useDispatch();
  const handleContentSizeChange = (
    contentWidth: number,
    contentHeight: number,
  ) => {
    scrollViewRef.current.scrollTo({y: contentHeight, animated: true});
  };
  const [chatText, setChatText] = useState<string>('');

  const showToastWithGravityAndOffset = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  // if text comes from speech then sendForImage will be true
  const handleSendTextForImage = () => {
    if (sendForImage) {
      if (textFromVoice) {
        dispatch(
          setImageData({
            title: textFromVoice,
            id: Math.random() * 10002345,
            type: 's',
            url: '',
          }),
        );
        dispatch(setLoader(true));
        fetchImageData(textFromVoice)
          .then((res: any) => {
            if (
              res &&
              res.statusCode &&
              res.statusCode === 200 &&
              res.reply &&
              res.reply.url
            ) {
              let resImgUrl: string = res.reply.url;
              dispatch(
                setImageData({
                  title: '',
                  id: Math.random() * 10002345,
                  type: 'r',
                  url: resImgUrl,
                }),
              );
            } else {
              showToastWithGravityAndOffset(
                'Network error or something went wrong!',
              );
            }
            dispatch(setTextFromVoice(''));
            dispatch(setLoader(false));
          })
          .catch((e: any) => {
            console.log('Error', e);
            showToastWithGravityAndOffset('Error while fetching data!');
            dispatch(setTextFromVoice(''));
            dispatch(setLoader(false));
          });
      }
      dispatch(setSendForImg(false));
    } else {
      if (chatText) {
        dispatch(
          setImageData({
            title: chatText,
            id: Math.random() * 10002345,
            type: 's',
            url: '',
          }),
        );
        dispatch(setLoader(true));
        fetchImageData(chatText)
          .then((res: any) => {
            if (
              res &&
              res.statusCode &&
              res.statusCode === 200 &&
              res.reply &&
              res.reply.url
            ) {
              let resImgUrl: string = res.reply.url;
              dispatch(
                setImageData({
                  title: '',
                  id: Math.random() * 10002345,
                  type: 'r',
                  url: resImgUrl,
                }),
              );
            } else {
              showToastWithGravityAndOffset(
                'Network error or something went wrong!',
              );
            }
            dispatch(setLoader(false));
          })
          .catch((e: any) => {
            console.log('Error', e);
            showToastWithGravityAndOffset('Error while fetching data!');
            dispatch(setLoader(false));
          });
      }
      setChatText('');
    }
  };

  useEffect(() => {
    if (sendForImage) {
      handleSendTextForImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendForImage]);

  return (
    <View style={styles.body}>
      <View style={styles.headers}>
        {!loader && (
          <Pressable onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </Pressable>
        )}
        <Text style={styles.heading}>Generate Images</Text>
      </View>

      {imageData.length !== 0 ? (
        <ScrollView
          style={styles.conversation}
          ref={scrollViewRef}
          onContentSizeChange={handleContentSizeChange}>
          {imageData.map((value: IImages) => (
            <ImageContent
              navigation={navigation}
              title={value.title}
              id={value.id}
              type={value.type}
              url={value.url}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.initialPage}>
          <Text style={styles.initialText}>
            Enter message or Tap on mic to start with images ...
          </Text>
        </View>
      )}
      {loader && (
        <View style={styles.typing}>
          <Text style={styles.typingText}>Generating...</Text>
        </View>
      )}
      {!loader && (
        <ChatBar
          nav={navigation}
          handleSend={handleSendTextForImage}
          chatText={chatText}
          setChatText={setChatText}
        />
      )}
    </View>
  );
};

export default ImageGeneration;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'black',
    height: '100%',
  },
  headers: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  conversation: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // height:600
  },
  initialPage: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    alignItems: 'center',
  },
  initialText: {
    color: '#444',
    maxWidth: 280,
    fontSize: 40,
    fontWeight: 'bold',
  },
  typing: {
    padding: 3,
  },
  typingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 3,
  },
});
