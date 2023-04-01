import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface VoiceState {
  send: boolean;
  sendForImg: boolean;
  textFromVoice: string;
  speakId: number;
}

const initialState: VoiceState = {
  send: false,
  sendForImg: false,
  textFromVoice: '',
  speakId: 0,
};

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    setSend: (state: VoiceState, action: PayloadAction<any>) => {
      state.send = action.payload;
    },
    setSendForImg: (state: VoiceState, action: PayloadAction<any>) => {
      state.sendForImg = action.payload;
    },
    setTextFromVoice: (state: VoiceState, action: PayloadAction<any>) => {
      state.textFromVoice = action.payload;
    },
    setSpeakId: (state: VoiceState, action: PayloadAction<any>) => {
      state.speakId = action.payload;
    },
  },
});

export const {setSend, setTextFromVoice, setSpeakId, setSendForImg} =
  voiceSlice.actions;
export const getSendState = (state: RootState) => state.voice.send;
export const getSendStateForImage = (state: RootState) =>
  state.voice.sendForImg;
export const getTextFromVoice = (state: RootState) => state.voice.textFromVoice;
export const getSpeakId = (state: RootState) => state.voice.speakId;

export default voiceSlice.reducer;
