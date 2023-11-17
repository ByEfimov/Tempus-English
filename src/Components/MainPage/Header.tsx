import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Styles from './Styles/MainPageCompsStyles.module.scss';
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { useWords } from '../../Hooks/useWords';
import { useAppDispatch } from '../../Hooks/redux-hooks';
import { setFilter } from '../../Store/slices/WordsSlice';

const HederMainPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { UserIsAuth } = useAuth();
    const { AllWords } = useWords();

    return (
        <div className={Styles.Header}>
            <Autocomplete
                freeSolo
                onInputChange={(_event, newInputValue) => {
                    dispatch(setFilter({ currentFilter: newInputValue }));
                }}
                disablePortal
                id="combo-box-demo"
                options={AllWords}
                className={Styles.input}
                renderInput={(params) => (
                    <TextField {...params} label="Слово..." />
                )}
            />
            <button
                onClick={() => {
                    navigate('/Favorits');
                }}
                className={Styles.FavoritsButton}
            >
                <FeatherIcon icon="star" />
            </button>
            <div className={Styles.LoginOrAdd}>
                {UserIsAuth ? (
                    <button
                        className={Styles.AddWordButton}
                        onClick={() => {
                            navigate('/AddWord');
                        }}
                    >
                        <FeatherIcon icon="plus-circle" />
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            navigate('/Login');
                        }}
                        className={Styles.LoginButton}
                    >
                        <FeatherIcon icon="user" />
                    </button>
                )}
            </div>
        </div>
    );
};
export default HederMainPage;
