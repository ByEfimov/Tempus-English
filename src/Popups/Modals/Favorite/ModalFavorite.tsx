import { useNavigate } from 'react-router-dom';
import { useWords } from '../../../Hooks/useWords';
import ModalWindow from '../isModal';
import Styles from '../StylesModal.module.scss';

export default function ModalFavorite() {
    const { Favorits } = useWords();
    const navigate = useNavigate();
    return (
        <ModalWindow>
            <div className={Styles.ModalSelectWord}>
                <div className={Styles.ModalTitle}>Избранное</div>
                <div className={Styles.Wods}>
                    {Favorits.length > 0 ? (
                        Favorits.map((word: any) => (
                            <button onClick={() => navigate('/Word/' + word)}>
                                {word}
                            </button>
                        ))
                    ) : (
                        <button className={Styles.Group}>Еще нет слов</button>
                    )}
                </div>
            </div>
        </ModalWindow>
    );
}
