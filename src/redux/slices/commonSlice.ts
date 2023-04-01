import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface CommonState {
  loader: boolean;
  voiceFromPage: string;
}

const initialState: CommonState = {
  loader: false,
  voiceFromPage: '',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoader: (state: CommonState, action: PayloadAction<any>) => {
      state.loader = action.payload;
    },
    setVoiceFromPage: (state: CommonState, action: PayloadAction<any>) => {
      state.voiceFromPage = action.payload;
    },
  },
});

export const {setLoader, setVoiceFromPage} = commonSlice.actions;
export const getLoaderState = (state: RootState) => state.common.loader;
export const getVoiceFromPage = (state: RootState) =>
  state.common.voiceFromPage;

export default commonSlice.reducer;
