import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '~/apis/auth';
import { LOGIN, REGISTER } from '~/utils/constants/actionType';
import { ILogin, IRegister } from '~/utils/interfaces/auth';

export const authLogin = createAsyncThunk(LOGIN, async (payload: ILogin, { rejectWithValue }) => {
    try {
        const response = await authApi.login(payload);
        // localStorage.setItem(StorageEnum.ACCESS_TOKEN, JSON.stringify(response?.token?.access));
        // localStorage.setItem(StorageEnum.REFRESH_TOKEN, JSON.stringify(response?.token?.refresh));
        // response?.data?.role
        //     ? localStorage.setItem(RolesEnum.USER, JSON.stringify(response?.data?.role))
        //     : localStorage.setItem(RolesEnum.ADMIN, JSON.stringify(response?.data?.role));
        // if (response.status === 404) {
        //     console.log(response.response.data)
        //     return response.response.data;
        // } else {
        //     return response.data;
        // }
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
