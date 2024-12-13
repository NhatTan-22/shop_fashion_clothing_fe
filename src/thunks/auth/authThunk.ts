import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '~/apis/auth';
import { LOGIN } from '~/utils/constants/actionType';
import { RolesEnum, StorageEnum } from '~/utils/constants/enum';
import { ILogin } from '~/utils/interfaces/auth';

export const authLogin = createAsyncThunk(LOGIN, async (payload: ILogin, { rejectWithValue }) => {
    try {
        const response = await authApi.login(payload);
        localStorage.setItem(StorageEnum.ACCESS_TOKEN, response?.token?.access);
        localStorage.setItem(StorageEnum.REFRESH_TOKEN, response?.token?.refresh);
        response?.data?.role
            ? localStorage.setItem(RolesEnum.USER, response?.data?.role)
            : localStorage.setItem(RolesEnum.ADMIN, response?.data?.role);
        if (response.status === 404) {
            return response.response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        return rejectWithValue(error);
    }
});
