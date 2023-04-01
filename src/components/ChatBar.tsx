import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setVoiceFromPage} from '../redux/slices/commonSlice';
import {IChatBarProps} from '../utils/types';

const ChatBar = ({nav, chatText, setChatText, handleSend}: IChatBarProps) => {
  const route = useRoute();
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.body}>
        <TextInput
          value={chatText}
          onChangeText={(text: string) => setChatText(text)}
          cursorColor={'#e5e5e5'}
          placeholderTextColor={'#e5e5e5'}
          style={styles.textInput}
          placeholder="Enter your message..."
        />
        <Pressable onPress={() => handleSend()}>
          <View style={styles.send}>
            <FontAwesome name="send" color="#e5e5e5" size={25} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(setVoiceFromPage(route.name));
            nav.navigate('Voice');
          }}>
          <View style={styles.mic}>
            <FontAwesome name="microphone" color="#e5e5e5" size={25} />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default ChatBar;

const styles = StyleSheet.create({
  body: {
    bottom: 0,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  send: {
    marginHorizontal: 5,
  },
  mic: {
    marginHorizontal: 5,
  },
  text: {
    color: 'white',
  },
  textInput: {
    color: 'white',
    backgroundColor: '#444',
    borderRadius: 10,
    flex: 1,
    padding: 10,
  },
});
