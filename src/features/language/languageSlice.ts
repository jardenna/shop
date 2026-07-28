import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { languageFiles } from '../../utils/createLanguageProxy';

export type SelectedLanguage = 'en' | 'da';

type LanguageState = {
  language: Record<string, string>;
  selectedLanguage: SelectedLanguage;
};

const initialState: LanguageState = {
  selectedLanguage: 'da',
  language: languageFiles.da,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SelectedLanguage>) => {
      state.selectedLanguage = action.payload;
      state.language = languageFiles[action.payload];
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.language.language;

export const selectSelectedLanguage = (state: RootState) =>
  state.language.selectedLanguage;

export default languageSlice.reducer;
