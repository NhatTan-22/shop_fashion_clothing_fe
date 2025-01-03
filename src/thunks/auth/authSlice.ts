import { createSlice } from '@reduxjs/toolkit';
import { authLoginThunk, authRegister } from '~/thunks/auth/authThunk';
import { StorageEnum } from '~/utils/constants/enum';

export interface AuthState {
    accessToken: string | null | undefined;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem(StorageEnum.ACCESS_TOKEN)! || null,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout() {
            localStorage.removeItem(StorageEnum.ACCESS_TOKEN);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(authLoginThunk.pending, (state, action) => {})
            .addCase(authLoginThunk.fulfilled, (state, action) => {})
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
