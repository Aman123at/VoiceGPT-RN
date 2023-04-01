import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSend,
  setSendForImg,
  setTextFromVoice,
} from '../redux/slices/voiceSlice';
import {getVoiceFromPage} from '../redux/slices/commonSlice';

const deviceWidth: number = Dimensions.get('window').width;
const deviceHeight: number = Dimensions.get('window').height;
const VoicePage = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [resultText, setResultText] = useState<string>('Listening...');
  const [vol, setVol] = useState<number>(0);
  const voiceFromPage = useSelector(getVoiceFromPage);
  useEffect(() => {
    function onSpeechStart(e: any) {
      console.log('I am started: ', e);
    }
    function onSpeechResults(e: any) {
      console.log('onSpeechResults: ', e);
      if (e.value && e.value.length > 0) {
        setResultText(e.value[0]);
      }
      setResults(e.value);
      setTimeout(() => {
        if (e && e.value && e.value.length > 0 && e.value[0]) {
          dispatch(setTextFromVoice(e.value[0]));
          if (voiceFromPage === 'Home') {
            dispatch(setSend(true));
          } else {
            dispatch(setSendForImg(true));
          }
        }
        if (voiceFromPage === 'Home') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Image');
        }
      }, 1000);
    }
    function onSpeechPartialResults(e: any) {
      if (e.value && e.value.length > 0) {
        setResultText(e.value[0]);
      }
    }
    function onSpeechVolumeChanged(e: any) {
      if (e.value > 0) {
        setVol(e.value);
      }
    }
    function onSpeechEnd(e: any) {
      console.log('onSpeechEnd ', e);
      setVol(0);
      setTimeout(() => {
        console.log('I am end;', results);
      }, 1000);
    }
    function onSpeechError(e: any) {
      console.log('onSpeechError: ', e);
      // if speech request comes from home page then navigate back to home else image page
      if (voiceFromPage === 'Home') {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Image');
      }
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startVoice = async () => {
    try {
      await Voice.start('en-IN');
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    startVoice();
  }, []);

  return (
    <View style={styles.centeredView}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.microphone, {borderWidth: Math.ceil(vol)}]}>
            <FontAwesome name="microphone" color="black" size={60} />
          </View>
          <Text style={styles.modalText}>{resultText}</Text>
        </View>
      </View>
    </View>
  );
};

export default VoicePage;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: deviceWidth,
    height: deviceHeight,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
  microphone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 120,
    height: 120,
    borderColor: '#dd0000',
    backgroundColor: 'white',
    borderRadius: 100,
    margin: 5,
  },
});
