import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface ChatState {
  chatData: any[];
}

const initialState: ChatState = {
  chatData: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatData: (state: ChatState, action: PayloadAction<any>) => {
      state.chatData.push(action.payload);
    },
  },
});

export const {setChatData} = chatSlice.actions;
export const getChatData = (state: RootState) => state.chat.chatData;

export default chatSlice.reducer;
