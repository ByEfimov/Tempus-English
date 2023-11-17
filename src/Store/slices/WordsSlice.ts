import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = {
    words: any;
    groups: any;
    lastOpenWords: any;
    favoritsWords: any;
    currentFilter: string;
};

const initialState: UserType = {
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
                words: any;
            }>
        ) {
            state.words = action.payload.words;
        },
        setFilter(
            state,
            action: PayloadAction<{
                currentFilter: any;
            }>
        ) {
            state.currentFilter = action.payload.currentFilter;
        },
        setGroups(
            state,
            action: PayloadAction<{
                groups: any;
            }>
        ) {
            state.groups = action.payload.groups;
        },
        addOpenWord(
            state,
            action: PayloadAction<{
                word: any;
            }>
        ) {
            if (state.lastOpenWords[0] != action.payload.word) {
                state.lastOpenWords = [
                    action.payload.word,
                    ...state.lastOpenWords,
                ];
            }
        },
        addFavoriteWord(
            state,
            action: PayloadAction<{
                word: any;
            }>
        ) {
            state.favoritsWords = [action.payload.word, ...state.favoritsWords];
        },
        removeFavoriteWord(
            state,
            action: PayloadAction<{
                word: any;
            }>
        ) {
            let index = state.favoritsWords.indexOf(action.payload.word);
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
