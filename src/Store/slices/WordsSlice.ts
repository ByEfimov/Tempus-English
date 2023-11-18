import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Word {
    inputGroup: string;
    inputPartofspeech: string;
    inputTranslate: string;
    inputUsage: string;
    inputUsageTranslate: string;
    inputWord: string;
}

export interface WordList {
    [key: string]: {
        [key: string]: Word;
    };
}

export interface groups {
    [key: string]: string;
}

export interface WordsType {
    words: WordList | null;
    groups: groups | null;
    lastOpenWords: string[];
    favoritsWords: string[];
    currentFilter: string;
}

const initialState: WordsType = {
    words: null,
    groups: null,
    lastOpenWords: [],
    favoritsWords: [],
    currentFilter: '',
};

const WordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        setWords(
            state,
            action: PayloadAction<{
                words: WordList;
            }>
        ) {
            state.words = action.payload.words;
        },
        setFilter(
            state,
            action: PayloadAction<{
                currentFilter: string;
            }>
        ) {
            state.currentFilter = action.payload.currentFilter;
        },
        setGroups(
            state,
            action: PayloadAction<{
                groups: groups;
            }>
        ) {
            state.groups = action.payload.groups;
        },
        addOpenWord(
            state,
            action: PayloadAction<{
                word: string | undefined;
            }>
        ) {
            if (state.lastOpenWords[0] != action.payload.word) {
                state.lastOpenWords = [
                    action.payload.word || '',
                    ...state.lastOpenWords,
                ];
            }
        },
        addFavoriteWord(
            state,
            action: PayloadAction<{
                word: string | undefined;
            }>
        ) {
            state.favoritsWords = [
                action.payload.word || '',
                ...state.favoritsWords,
            ];
        },
        removeFavoriteWord(
            state,
            action: PayloadAction<{
                word: string | undefined;
            }>
        ) {
            let index = state.favoritsWords.indexOf(action.payload.word || '');
            index !== -1 && state.favoritsWords.splice(index, 1);
        },
    },
});
export const {
    setWords,
    setGroups,
    addOpenWord,
    addFavoriteWord,
    removeFavoriteWord,
    setFilter,
} = WordsSlice.actions;

export default WordsSlice.reducer;
