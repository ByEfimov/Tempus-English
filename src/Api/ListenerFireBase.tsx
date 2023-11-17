import { getDatabase, ref, onValue } from 'firebase/database';
import { useAppDispatch } from '../Hooks/redux-hooks';
import { setGroups, setWords } from '../Store/slices/WordsSlice';
import { useEffect } from 'react';

interface ListenerFC {
    children: React.ReactChild | React.ReactNode;
}

export default function ListenerFB({ children }: ListenerFC) {
    const db = getDatabase();

    const starCountRef = ref(db, '/');
    const dispatch = useAppDispatch();
    useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                dispatch(setWords({ words: data.Words }));
                dispatch(setGroups({ groups: data.Groups }));
            }
        });
    }, []);

    return children;
}
