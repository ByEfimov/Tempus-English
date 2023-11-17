import { useNavigate } from 'react-router-dom';
import Styles from './Styles/MainPageCompsStyles.module.scss';
import { useWords } from '../../Hooks/useWords';

const Words = () => {
    const navigate = useNavigate();
    const { FilteredWords } = useWords();
    console.log(FilteredWords);
    return (
        <div className={Styles.Words}>
            <div className={Styles.title}>Слова</div>
            {Array.isArray(FilteredWords) &&
                FilteredWords.map((group) => (
                    <div className={Styles.Group}>
                        <div
                            className={Styles.GroupTitle}
                            onClick={() => navigate('/Group/' + group.title)}
                        >
                            {group.title}
                        </div>
                        <div className={Styles.words}>
                            {group.words.map((word) => (
                                <button
                                    className={Styles.word}
                                    onClick={() =>
                                        navigate('/Word/' + word.inputWord)
                                    }
                                >
                                    {word.inputWord}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Words;
