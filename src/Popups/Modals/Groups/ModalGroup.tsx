import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ModalWindow, { closePopupF } from '../isModal';
import FeatherIcon from 'feather-icons-react';
import { useWords } from '../../../Hooks/useWords';
import { getDatabase, ref, set } from 'firebase/database';
import Styles from '../StylesModal.module.scss';
import { useAuth } from '../../../Hooks/useAuth';

export default function ModalGroup() {
    const { selectGroup } = useParams();
    const navigate = useNavigate();
    const { UserIsAuth } = useAuth();

    const { Words, Groups } = useWords();
    const desiredObject = Words.find((item) => item.title == selectGroup);

    function removeGroup() {
        if (Array.isArray(Groups) && Object.keys(Groups).length > 1) {
            const db = getDatabase();
            set(ref(db, 'Groups/' + desiredObject?.title), null);
            set(ref(db, 'Words/' + desiredObject?.title), null);
            closePopupF();
        }
    }

    return (
        <ModalWindow>
            <div className={Styles.ModalSelectWord}>
                <div className={Styles.ModalTitle}>
                    {desiredObject?.title}{' '}
                    {UserIsAuth && (
                        <button
                            onClick={() => removeGroup()}
                            className={Styles.dell}
                        >
                            <FeatherIcon icon="trash-2"></FeatherIcon>
                        </button>
                    )}
                </div>
                <div className={Styles.Wods}>
                    {desiredObject?.words?.length || [].length > 0 ? (
                        desiredObject?.words?.map((word) => (
                            <button
                                onClick={() =>
                                    navigate('/Word/' + word.inputWord)
                                }
                            >
                                {word.inputWord}
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
