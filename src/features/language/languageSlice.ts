import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import danishLang from '../../locales/da.json';
import englishLang from '../../locales/en.json';

export type SelectedLanguage = 'en' | 'da';

type LanguageState = {
  language: Record<string, string>;
  selectedLanguage: SelectedLanguage;
};

const languageFiles: Record<SelectedLanguage, Record<string, string>> = {
  da: danishLang,
  en: englishLang,
};

// Initial state
const initialState: LanguageState = {
  selectedLanguage: 'da',
  language: danishLang,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SelectedLanguage>) => {
      state.selectedLanguage = action.payload;
      state.language = languageFiles[action.payload]; // Load language synchronously
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state: RootState) => state.language.language;
export const selectSelectedLanguage = (state: RootState) =>
  state.language.selectedLanguage;

export default languageSlice.reducer;
