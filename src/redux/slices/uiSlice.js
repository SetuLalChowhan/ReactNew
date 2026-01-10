import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resetToken: null,
  apiError: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setResetToken: (state, action) => {
      state.resetToken = action.payload;
    },
    setApiError: (state, action) => {
      state.apiError = action.payload;
    },
    clearUiState: (state) => {
      state.resetToken = null;
      state.apiError = null;
    },
  },
});

export const { setResetToken, setApiError, clearUiState } = uiSlice.actions;

export default uiSlice.reducer;
