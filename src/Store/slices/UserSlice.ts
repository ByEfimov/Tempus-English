import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = {
    name: string | null;
};

const initialState: UserType = {
    name: null,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(
            state,
            action: PayloadAction<{
                name: string;
            }>
        ) {
            state.name = action.payload.name;
        },
        removeUser(state) {
            state.name = null;
        },
    },
});
export const { setUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;
