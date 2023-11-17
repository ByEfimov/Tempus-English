import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    databaseURL: 'https://tempus-english-default-rtdb.firebaseio.com',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
