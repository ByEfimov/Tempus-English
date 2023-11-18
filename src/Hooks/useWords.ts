import { useAppSelector } from './redux-hooks';

export function useWords() {
    const { words, groups, lastOpenWords, favoritsWords, currentFilter } =
        useAppSelector((state) => state.words);

    const wordsArray =
        words &&
        Object.keys(words).map((title) => {
            return { title, words: Object.values(words[title]) };
        });

    const newArrayOfInputWords = wordsArray?.map((item) =>
        item.words.map((word) => word.inputWord)
    );

    const FilteredWords = wordsArray?.map((obj) => ({
        ...obj,
        words: obj.words.map((wordObj) => ({
            ...wordObj,
            inputWord: currentFilter
                ? wordObj.inputWord
                      .split(/\s+/)
                      .filter((word) =>
                          word
                              .toLowerCase()
                              .includes(currentFilter.toLowerCase())
                      )
                      .join(' ')
                : wordObj.inputWord,
        })),
    }));

    return {
        FilteredWords,
        Filter: currentFilter,
        Words: wordsArray || [],
        Groups: groups,
        AllWords: newArrayOfInputWords?.flat() || [],
        LastWords: lastOpenWords,
        Favorits: favoritsWords,
    };
}
