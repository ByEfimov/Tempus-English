import { useState } from 'react';
import ModalWindow, { closePopupF } from '../isModal';
import Styles from '../StylesModal.module.scss';
import { useAppDispatch } from '../../../Hooks/redux-hooks';
import { setUser } from '../../../Store/slices/UserSlice';

export default function ModalLogin() {
    const [inputName, setInputName] = useState('');
    const [inputPass, setInputPass] = useState('');
    const dispatch = useAppDispatch();

    function UserLogin() {
        if (inputName === 'MarinaP' && inputPass === '81000') {
            dispatch(setUser({ name: 'MarinaP' }));
            closePopupF();
        }
    }

    return (
        <ModalWindow>
            <div className={Styles.ModalContentLogin}>
                <div className={Styles.ModalTitle}>Войти в аккаунт</div>
                <div className={Styles.Inputs}>
                    <label htmlFor="input1">Имя</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setInputName(e.target.value);
                        }}
                        placeholder="Александр"
                        id="input1"
                    />
                    <label htmlFor="input2">Пароль</label>
                    <input
                        type="password"
                        onChange={(e) => {
                            setInputPass(e.target.value);
                        }}
                        placeholder="12345"
                        id="input2"
                    />
                </div>
                <button
                    onClick={() => {
                        UserLogin();
                    }}
                >
                    Войти
                </button>
            </div>
        </ModalWindow>
    );
}
