import { createSlice } from '@reduxjs/toolkit';
import { authLoginThunk, authRegister } from '~/thunks/auth/authThunk';
import { StorageEnum } from '~/utils/constants/enum';
import { IUser } from '~/utils/interfaces/auth';

export interface AuthState {
    accessToken: string | null | undefined;
    user: IUser | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem(StorageEnum.ACCESS_TOKEN) || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout(state) {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        },
    },
    extraReducers(builder) {
        builder
            .addCase(authLoginThunk.pending, (state, action) => {})
            .addCase(authLoginThunk.fulfilled, (state, action) => {
                const { data, token } = action.payload;
                state.user = data;
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
