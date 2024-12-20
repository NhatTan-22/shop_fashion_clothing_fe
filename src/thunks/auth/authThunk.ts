import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '~/apis/auth';
import { LOGIN, REGISTER } from '~/utils/constants/actionType';
import { StorageEnum } from '~/utils/constants/enum';
import { ILogin, IRegister } from '~/utils/interfaces/auth';

export const authLoginThunk = createAsyncThunk(LOGIN, async (payload: ILogin, { rejectWithValue }) => {
    try {
        const response = await authApi.login(payload);
        localStorage.setItem(StorageEnum.ACCESS_TOKEN, JSON.stringify(response?.data?.token?.access));
        localStorage.setItem(StorageEnum.REFRESH_TOKEN, JSON.stringify(response?.data?.token?.refresh));
        // response?.data?.data?.role
        //     ? localStorage.setItem(RolesEnum.USER, JSON.stringify(response?.data?.data.role))
        //     : localStorage.setItem(RolesEnum.ADMIN, JSON.stringify(response?.data?.data.role));
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
