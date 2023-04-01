import {configureStore} from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import commonReducer from './slices/commonSlice';
import voiceReducer from './slices/voiceSlice';
import imageReducer from './slices/imageSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    common: commonReducer,
    voice: voiceReducer,
    image: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
