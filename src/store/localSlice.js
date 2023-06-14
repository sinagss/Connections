import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: 'en',
  ltrDirection: true,
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    changeLocale: (state, action) => {
      const { updatedLocale } = action.payload;
      if (state.locale !== updatedLocale) {
        state.locale = updatedLocale;
        state.ltrDirection = false;
      }
    },
  },
});

export const { changeLocale } = localeSlice.actions;

export default localeSlice.reducer;
