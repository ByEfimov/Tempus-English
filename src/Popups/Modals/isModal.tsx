import { useNavigate } from 'react-router-dom';
import Styles from './StylesModal.module.scss';
import React from 'react';

interface ModalProps {
    children: React.ReactChild | React.ReactNode;
}

export let closePopupF: () => void;

export default function ModalWindow({ children }: ModalProps) {
    const navigate = useNavigate();
    const ModalRef = React.createRef<HTMLDialogElement>();

    function closePopup() {
        ModalRef.current?.classList.add(Styles.close);
        setTimeout(() => {
            navigate('/');
        }, 300);
    }
    closePopupF = closePopup;
    return (
        <dialog className={Styles.ModalWindow} ref={ModalRef}>
            <div
                className={Styles.back}
                onClick={(e) => {
                    e.stopPropagation();
                    closePopup();
                }}
            ></div>
            <div className={Styles.container}>{children}</div>
        </dialog>
    );
}
