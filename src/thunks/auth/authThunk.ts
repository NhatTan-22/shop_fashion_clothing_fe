import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '~/apis/auth';
import { LOGIN, REGISTER } from '~/utils/constants/actionType';
import { ILogin, IRegister } from '~/utils/interfaces/auth';

export const authLoginThunk = createAsyncThunk(LOGIN, async (payload: ILogin, { rejectWithValue }) => {
    try {
        const response = await authApi.login(payload);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const authRegister = createAsyncThunk(REGISTER, async (payload: IRegister, { rejectWithValue }) => {
    try {
        const response = await authApi.register(payload);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
