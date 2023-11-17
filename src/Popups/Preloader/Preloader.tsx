import logo from '../../Assets/Logos/logo.svg';
import { useWords } from '../../Hooks/useWords';
import Styles from './Preloader.module.scss';
import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const PreloaderRef = React.createRef<HTMLDialogElement>();
    const [PreloaderOpen, setPreloaderOpen] = useState(true);
    const { Words } = useWords();

    function checkOnOpenPreloader() {
        if (Words != null) {
            PreloaderRef.current?.classList.add(Styles.close);
            setTimeout(() => {
                setPreloaderOpen(false);
            }, 500);
        }
    }
    useEffect(() => {
        checkOnOpenPreloader();
    }, [Words]);

    return (
        PreloaderOpen && (
            <dialog className={Styles.Preloader} ref={PreloaderRef}>
                <img src={logo} alt="" />
            </dialog>
        )
    );
};
export default Preloader;
