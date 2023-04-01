import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Tts from 'react-native-tts';
import {IChatProps} from '../utils/types';
import {useDispatch, useSelector} from 'react-redux';
import {getSpeakId, setSpeakId} from '../redux/slices/voiceSlice';

const ChatContent = ({title, id, type}: IChatProps) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const dispatch = useDispatch();
  const speakId = useSelector(getSpeakId);
  const handleSpeak = (contentToSpeak: string) => {
    if (isSpeaking) {
      handleTtsFinish();
    } else {
      Tts.getInitStatus().then(() => {
        setIsSpeaking(true);
        Tts.speak(contentToSpeak);
        Tts.addEventListener('tts-finish', handleTtsFinish);
      });
    }
  };

  const handleTtsFinish = () => {
    setIsSpeaking(false);
    dispatch(setSpeakId(0));
    Tts.stop();
  };
  useEffect(() => {
    Tts.setDefaultLanguage('en-IN');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
  }, []);
  useEffect(() => {
    if (id === speakId) {
      handleSpeak(title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakId]);
  return (
    <View
      style={type === 's' ? styles.green : styles.pink}
      key={id ? id : Math.random() * 12345}>
      <View>
        <Text style={type === 's' ? styles.tagS : styles.tagR}>
          {type === 's' ? 'You' : 'GPT'}
        </Text>
        <Text style={type === 's' ? styles.text : styles.textReply}>
          {title}
        </Text>
      </View>
      {type === 'r' && (
        <Pressable
          onPress={() => {
            if (speakId === 0) {
              dispatch(setSpeakId(id));
            } else {
              dispatch(setSpeakId(0));
              handleTtsFinish();
            }
          }}>
          <View style={styles.speaker}>
            <AntDesign
              name={speakId === id ? 'pause' : 'sound'}
              color="blue"
              size={20}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default ChatContent;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    paddingHorizontal: 8,
    fontSize: 15,
    paddingBottom: 2,
    fontWeight: '500',
  },
  textReply: {
    color: 'black',
    paddingHorizontal: 8,
    fontSize: 15,
    paddingBottom: 2,
    width: 280,
    fontWeight: '500',
  },
  speaker: {
    padding: 5,
  },
  green: {
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    maxWidth: 250,
    marginLeft: 'auto',
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 4,
  },
  pink: {
    backgroundColor: '#F7CCD3',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 320,
    marginRight: 'auto',
    borderRadius: 10,
    marginLeft: 10,
    marginVertical: 4,
  },
  tagR: {
    fontWeight: 'bold',
    color: '#ff00ff',
    marginHorizontal: 5,
    marginTop: 2,
  },
  tagS: {
    fontWeight: 'bold',
    color: '#0000ff',
    marginHorizontal: 5,
    marginTop: 2,
  },
});
