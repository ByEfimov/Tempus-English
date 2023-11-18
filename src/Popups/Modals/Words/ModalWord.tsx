import { useNavigate, useParams } from 'react-router-dom';
import ModalWindow, { closePopupF } from '../isModal';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../Hooks/redux-hooks';
import {
    Word,
    addFavoriteWord,
    addOpenWord,
    removeFavoriteWord,
} from '../../../Store/slices/WordsSlice';
import { getDatabase, ref, set } from 'firebase/database';
import { useWords } from '../../../Hooks/useWords';
import FeatherIcon from 'feather-icons-react';
import Styles from '../StylesModal.module.scss';
import { useAuth } from '../../../Hooks/useAuth';

export default function ModalWord() {
    const { selectWord } = useParams();
    const { UserIsAuth } = useAuth();
    const { Words, Favorits, AllWords } = useWords();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(addOpenWord({ word: selectWord || '' }));
    }, []);

    const desiredObject: Word | undefined = Words.find((item) =>
        item.words.some((word) => word.inputWord === selectWord)
    )?.words.find((word) => word.inputWord === selectWord);

    const isFav = Favorits.find((i) => i === desiredObject?.inputWord);

    function favWord() {
        if (!isFav) {
            dispatch(addFavoriteWord({ word: desiredObject?.inputWord || '' }));
        } else {
            dispatch(
                removeFavoriteWord({ word: desiredObject?.inputWord || '' })
            );
        }
    }

    function removeWord() {
        if (AllWords.length > 1) {
            const db = getDatabase();
            set(
                ref(
                    db,
                    'Words/' +
                        desiredObject?.inputGroup +
                        '/' +
                        desiredObject?.inputWord
                ),
                null
            );
            closePopupF();
        }
    }

    return (
        <ModalWindow>
            <div className={Styles.ModalSelectWord}>
                <div className={Styles.top}>
                    <div className={Styles.word}>
                        <div className={Styles.title}>
                            {desiredObject
                                ? desiredObject.inputWord
                                : 'Слово не найдено'}
                        </div>
                        <div className={Styles.translate}>
                            <p>- {desiredObject?.inputTranslate}</p>
                        </div>
                    </div>

                    <div className={Styles.use}>
                        <button
                            onClick={favWord}
                            className={Styles.addFavorite}
                        >
                            {isFav ? (
                                <div className={Styles.fav}>
                                    <FeatherIcon icon="star" />
                                </div>
                            ) : (
                                <FeatherIcon icon="star" />
                            )}
                        </button>
                        {UserIsAuth && (
                            <button
                                className={Styles.dell}
                                onClick={removeWord}
                            >
                                <FeatherIcon icon="trash-2"></FeatherIcon>
                            </button>
                        )}
                    </div>
                </div>
                <div className={Styles.data}>
                    <div>
                        Часть речи:{' '}
                        <span>{desiredObject?.inputPartofspeech}</span>
                    </div>
                    <button
                        onClick={() =>
                            navigate('/Group/' + desiredObject?.inputGroup)
                        }
                    >
                        Группа: <span>{desiredObject?.inputGroup}</span>
                    </button>
                </div>
                <div className={Styles.usage}>
                    <div>
                        Использование:
                        <HighlightWord
                            text={desiredObject?.inputUsage}
                            wordToHighlight={desiredObject?.inputWord}
                        />
                    </div>

                    <div>
                        Перевод:
                        <HighlightWord
                            text={desiredObject?.inputUsageTranslate}
                            wordToHighlight={desiredObject?.inputTranslate}
                        />
                    </div>
                </div>
            </div>
        </ModalWindow>
    );
}

type HighlightProps = {
    text?: string;
    wordToHighlight?: string;
};

const HighlightWord: React.FC<HighlightProps> = ({ text, wordToHighlight }) => {
    const words = text?.split(' ');

    return (
        <p>
            {words?.map((word, index) => {
                if (word.toLowerCase() === wordToHighlight?.toLowerCase()) {
                    return (
                        <span
                            key={index}
                            style={{ textDecoration: 'underline' }}
                        >
                            {word}{' '}
                        </span>
                    );
                }
                return <span key={index}>{word} </span>;
            })}
        </p>
    );
};
