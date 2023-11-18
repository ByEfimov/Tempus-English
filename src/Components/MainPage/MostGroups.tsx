import { useNavigate } from 'react-router-dom';
import Styles from './Styles/MainPageCompsStyles.module.scss';
import { useWords } from '../../Hooks/useWords';

const MostGroups = () => {
    const navigate = useNavigate();
    const { LastWords } = useWords();

    return (
        <div className={Styles.MostGrouops}>
            <div className={Styles.title}>Последние</div>
            {LastWords.length > 0 ? (
                LastWords?.map((word) => (
                    <button
                        className={Styles.Group}
                        onClick={() => navigate('/Word/' + word)}
                    >
                        {word}
                    </button>
                ))
            ) : (
                <button className={Styles.Group}>Еще нет слов</button>
            )}
        </div>
    );
};
export default MostGroups;
