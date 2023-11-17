import { Link } from 'react-router-dom';
import Styles from './Styles/MainPageCompsStyles.module.scss';

export default function Footer() {
    return (
        <Link to={'https://t.me/byEfimov'} className={Styles.Footer}>
            By Efimov & Tempus
        </Link>
    );
}
