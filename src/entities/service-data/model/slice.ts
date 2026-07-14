import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getServiceData, type ServiceData } from "@shared/api";

interface ServiceDataState {
  data: ServiceData | null;
  loaded: boolean;
}

const initialState: ServiceDataState = {
  data: null,
  loaded: false,
};

export const fetchServiceData = createAsyncThunk(
  "serviceData/fetch",
  async () => getServiceData(),
);

export const serviceDataSlice = createSlice({
  name: "serviceData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServiceData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchServiceData.rejected, (state) => {
      state.loaded = true;
    });
  },
});

export const serviceDataReducer = serviceDataSlice.reducer;
