import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface homeState {
  assetList: Array<Object> | null;
  eventList: Array<Object> | null;
}

const initialState: homeState = {
  assetList: null,
  eventList: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setAssetList: (state, action: PayloadAction<Array<Object>>) => {
      state.assetList = action.payload;
    },
    setEventList: (state, action: PayloadAction<Array<Object>>) => {
      state.eventList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAssetList, setEventList } = homeSlice.actions;

export default homeSlice.reducer;
