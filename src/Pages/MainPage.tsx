import Footer from '../Components/MainPage/Footer';
import HederMainPage from '../Components/MainPage/Header';
import MostGroups from '../Components/MainPage/MostGroups';
import Words from '../Components/MainPage/Words';
import Styles from './Styles.module.scss';

const MainPage = () => {
    return (
        <div className={Styles.MainPage}>
            <HederMainPage></HederMainPage>
            <MostGroups></MostGroups>
            <Words></Words>
            <Footer></Footer>
        </div>
    );
};
export default MainPage;
