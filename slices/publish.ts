import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface publishState {
  asset: Object | null;
  pictureEvent: string | null;
}

const initialState: publishState = {
  asset: null,
  pictureEvent: null,
};

export const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    pickAsset: (state, action: PayloadAction<Object>) => {
      state.asset = action.payload;
    },
    pickPictureEvent: (state, action: PayloadAction<string>) => {
      state.pictureEvent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pickAsset, pickPictureEvent } = publishSlice.actions;

export default publishSlice.reducer;
