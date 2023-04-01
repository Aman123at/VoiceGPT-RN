import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface ImageState {
  imageData: any[];
}

const initialState: ImageState = {
  imageData: [],
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImageData: (state: ImageState, action: PayloadAction<any>) => {
      state.imageData.push(action.payload);
    },
  },
});

export const {setImageData} = imageSlice.actions;
export const getImageData = (state: RootState) => state.image.imageData;

export default imageSlice.reducer;
