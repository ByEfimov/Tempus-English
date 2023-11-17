import { useAppSelector } from './redux-hooks';

export function useAuth() {
    const { name } = useAppSelector((state) => state.user);
    return {
        UserIsAuth: !!name,
        UserName: name,
    };
}
