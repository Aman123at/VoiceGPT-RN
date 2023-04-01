import {View, StyleSheet, ScrollView, Text, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import ChatContent from '../components/ChatContent';
import ChatBar from '../components/ChatBar';
import {fetchChatData} from '../ApiCalls/chatApis';
import {HomeScreenProps, IChatProps} from '../utils/types';
import {useDispatch, useSelector} from 'react-redux';
import {getChatData, setChatData} from '../redux/slices/chatSlice';
import {getLoaderState, setLoader} from '../redux/slices/commonSlice';
import {
  getTextFromVoice,
  getSendState,
  setTextFromVoice,
  setSend,
  setSpeakId,
  getSpeakId,
} from '../redux/slices/voiceSlice';
import Tts from 'react-native-tts';

const Home = ({navigation}: HomeScreenProps) => {
  const scrollViewRef: any = useRef();
  const chatData = useSelector(getChatData);
  const loader = useSelector(getLoaderState);
  const send = useSelector(getSendState);
  const textFromVoice = useSelector(getTextFromVoice);
  const speakId = useSelector(getSpeakId);

  const dispatch = useDispatch();
  const handleContentSizeChange = (
    contentWidth: number,
    contentHeight: number,
  ) => {
    if (speakId !== 0) {
      dispatch(setSpeakId(0));
      Tts.stop();
    }
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

  // if text comes from speech then send will be true
  const handleSend = () => {
    if (send) {
      if (textFromVoice) {
        dispatch(
          setChatData({
            title: textFromVoice,
            id: Math.random() * 10002345,
            type: 's',
          }),
        );

        dispatch(setLoader(true));
        fetchChatData(textFromVoice)
          .then((res: any) => {
            if (
              res &&
              res.statusCode &&
              res.statusCode === 200 &&
              res.reply &&
              res.reply.message
            ) {
              let content: string = res.reply.message.content;
              let randomId: number = Math.random() * 10002345;
              dispatch(
                setChatData({
                  title: content,
                  id: randomId,
                  type: 'r',
                }),
              );
              setTimeout(() => {
                dispatch(setSpeakId(randomId));
              }, 300);
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
      dispatch(setSend(false));
    } else {
      if (chatText) {
        dispatch(
          setChatData({
            title: chatText,
            id: Math.random() * 10002345,
            type: 's',
          }),
        );
        dispatch(setLoader(true));
        fetchChatData(chatText)
          .then((res: any) => {
            if (
              res &&
              res.statusCode &&
              res.statusCode === 200 &&
              res.reply &&
              res.reply.message
            ) {
              let content: string = res.reply.message.content;

              dispatch(
                setChatData({
                  title: content,
                  id: Math.random() * 10002345,
                  type: 'r',
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
    if (send) {
      handleSend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send]);
  return (
    <View style={styles.body}>
      <Header navigation={navigation} />
      {chatData.length !== 0 ? (
        <ScrollView
          style={styles.conversation}
          ref={scrollViewRef}
          onContentSizeChange={handleContentSizeChange}>
          {chatData.map((value: IChatProps) => (
            <ChatContent title={value.title} id={value.id} type={value.type} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.initialPage}>
          <Text style={styles.initialText}>
            Enter message or Tap on mic to start conversation ...
          </Text>
        </View>
      )}

      {loader && (
        <View style={styles.typing}>
          <Text style={styles.typingText}>Typing...</Text>
        </View>
      )}
      {!loader && (
        <ChatBar
          nav={navigation}
          handleSend={handleSend}
          chatText={chatText}
          setChatText={setChatText}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'black',
    height: '100%',
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
  conversation: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
