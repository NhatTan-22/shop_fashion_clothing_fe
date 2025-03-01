import { createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "~/apis/order";
import { GET_ORDER } from "~/utils/constants/actionType";
import { IParamsPagination } from "~/utils/interfaces/common";


export const getOrderThunk = createAsyncThunk(
    GET_ORDER,
    async (params: IParamsPagination, { rejectWithValue }) => {
        try {
            const response = await orderApi.getAllOrder(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// export const addSupplierThunk = createAsyncThunk(
//     ADD_SUPPLIER,
//     async (formData: ISupplier | FormData, { rejectWithValue }) => {
//         try {
//             const response = await supplierApi.addSupplier(formData);
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const deleteSupplierThunk = createAsyncThunk(DELETE_SUPPLIER, async (payload: Object, { rejectWithValue }) => {
//     try {
//         const response = await supplierApi.deleteSupplier(payload);
//         return response;
//     } catch (error: any) {
//         return rejectWithValue(error.response.data);
//     }
// });
