import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "en",
  direction: "ltr",
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    changeLocale: (state, action) => {
      const { updatedLocale } = action.payload;
      switch (updatedLocale) {
        case "en":
          state.locale = updatedLocale;
          state.direction = "ltr";

          break;
        case "fr":
          state.locale = updatedLocale;
          state.direction = "rtl";

          break;

        default:
          state.locale = "en";
          state.direction = "ltr";
          break;
      }
    },
  },
});

export const { changeLocale } = localeSlice.actions;

export default localeSlice.reducer;
