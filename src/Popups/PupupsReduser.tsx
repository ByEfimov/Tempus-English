import ModalLogin from './Modals/Activities/ModalLogin';
import ModalFavorite from './Modals/Favorite/ModalFavorite';
import ModalAddGroup from './Modals/Groups/ModalAddGroup';
import ModalGroup from './Modals/Groups/ModalGroup';
import ModalAddWord from './Modals/Words/ModalAddWord';
import ModalWord from './Modals/Words/ModalWord';
import Preloader from './Preloader/Preloader';
import { Route, Routes } from 'react-router-dom';

const PopupsReduser = () => {
    return (
        <>
            <Preloader></Preloader>
            <Routes>
                <Route path="/" element={<></>} />
                <Route path="/Login" element={<ModalLogin />} />
                <Route path="/Favorits" element={<ModalFavorite />} />
                <Route path="/AddWord" element={<ModalAddWord />} />
                <Route path="/AddGroup" element={<ModalAddGroup />} />
                <Route path="/Word/:selectWord" element={<ModalWord />} />
                <Route path="/Group/:selectGroup" element={<ModalGroup />} />
            </Routes>
        </>
    );
};
export default PopupsReduser;
