import { useNavigate } from 'react-router-dom';
import ModalWindow, { closePopupF } from '../isModal';
import Autocomplete from '@mui/material/Autocomplete';
import Styles from '../StylesModal.module.scss';
import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { useWords } from '../../../Hooks/useWords';

export default function ModalAddWord() {
    const { Groups } = useWords();

    const [inputWord, setInputWord] = useState<string | null>('');
    const [inputTranslate, setInputTranslate] = useState<string | null>('');
    const [inputPartofspeech, setInputPartofspeech] = useState<string | null>(
        ''
    );
    const [inputGroup, setInputGroup] = useState<string | null>('');
    const [inputUsage, setInputUsage] = useState<string | null>('');
    const [inputUsageTranslate, setInputUsageTranslate] = useState<
        string | null
    >('');

    const navigate = useNavigate();

    function pushNewWord() {
        if (
            inputWord &&
            inputTranslate &&
            inputPartofspeech &&
            inputGroup &&
            inputUsage &&
            inputUsageTranslate
        ) {
            const NewWord = {
                inputWord,
                inputTranslate,
                inputPartofspeech,
                inputGroup,
                inputUsage,
                inputUsageTranslate,
            };

            const db = getDatabase();
            set(ref(db, 'Words/' + inputGroup + '/' + inputWord), NewWord);
            closePopupF();
        }
    }

    return (
        <ModalWindow>
            <div className={Styles.ModalContentAddWord}>
                <div className={Styles.ModalTitle}> Добавить слово</div>

                <form className={Styles.Inputs}>
                    <label htmlFor="inp1">Слово</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setInputWord(e.target.value);
                        }}
                        placeholder="Apple"
                        id="inp1"
                    />
                    <label htmlFor="inp2">Перевод</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setInputTranslate(e.target.value);
                        }}
                        placeholder="Яблоко"
                        id="inp2"
                    />
                    <label htmlFor="inp3">Часть речи</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setInputPartofspeech(e.target.value);
                        }}
                        placeholder="noun"
                        id="inp3"
                    />
                    <label htmlFor="inp4">Группа</label>
                    <span>
                        <Autocomplete
                            onInputChange={(_event, newInputValue) => {
                                setInputGroup(newInputValue);
                            }}
                            disablePortal
                            id="combo-box-demo"
                            sx={{ height: 42, width: '100%' }}
                            options={
                                (Groups && Object.values(Groups)) || [
                                    'Вне группы',
                                ]
                            }
                            className={Styles.input}
                            renderInput={(params) => (
                                <div ref={params.InputProps.ref}>
                                    <input
                                        id="inp4"
                                        type="text"
                                        {...params.inputProps}
                                        placeholder="1 класс"
                                    />
                                </div>
                            )}
                        />
                        <button
                            className={Styles.button}
                            onClick={() => navigate('/AddGroup')}
                        >
                            +
                        </button>
                    </span>
                    <label htmlFor="inp5">Использование</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setInputUsage(e.target.value);
                        }}
                        placeholder="I am eating an apple"
                        id="inp5"
                    />
                    <label htmlFor="inp6">Перевод предложения</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setInputUsageTranslate(e.target.value);
                        }}
                        placeholder="Я ем яблоко"
                        id="inp6"
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            pushNewWord();
                        }}
                        className={Styles.button}
                    >
                        Добавить слово
                    </button>
                </form>
            </div>
        </ModalWindow>
    );
}
