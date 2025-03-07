import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authLoginThunk, authRegister } from '~/thunks/auth/authThunk';
import { StorageEnum } from '~/utils/constants/enum';
import { IUser } from '~/utils/interfaces/auth';

export interface AuthState {
    accessToken: string | null | undefined;
    user: IUser | null;
    address: IUser[];
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem(StorageEnum.ACCESS_TOKEN) || null,
    address: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout(state) {
            state.user = null;
            state.accessToken = null;
            localStorage.clear();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(authLoginThunk.pending, (state, action) => {})
            .addCase(authLoginThunk.fulfilled, (state, action) => {
                const { data, token } = action.payload;
                state.user = data;
                state.address.push(data);
                state.accessToken = token.access;
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem(StorageEnum.ACCESS_TOKEN, token.access);
                localStorage.setItem(StorageEnum.REFRESH_TOKEN, token.refresh);
            })
            .addCase(authLoginThunk.rejected, (state, action) => {});

        builder
            .addCase(authRegister.pending, (state, action) => {})
            .addCase(authRegister.fulfilled, (state, action) => {})
            .addCase(authRegister.rejected, (state, action) => {});
    },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
