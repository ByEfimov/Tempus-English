import { useState } from 'react';
import ModalWindow, { closePopupF } from '../isModal';
import Styles from '../StylesModal.module.scss';
import { getDatabase, ref, set } from 'firebase/database';

export default function ModalAddGroup() {
    const [inputGroup, setInputGroup] = useState('');

    function pushNewWord() {
        if (inputGroup) {
            const db = getDatabase();
            set(ref(db, 'Groups/' + inputGroup), inputGroup);
            closePopupF();
        }
    }

    return (
        <ModalWindow>
            <div className={Styles.ModalContentAddWord}>
                <div className={Styles.ModalTitle}>Добавить группу</div>
                <form className={Styles.Inputs}>
                    <label htmlFor="inp1">Название</label>
                    <input
                        type="text"
                        onChange={(e) => setInputGroup(e.target.value)}
                        placeholder="Для 1 класса"
                        id="inp1"
                    />
                </form>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        pushNewWord();
                    }}
                    className={Styles.button}
                >
                    Добавить группу
                </button>
            </div>
        </ModalWindow>
    );
}
