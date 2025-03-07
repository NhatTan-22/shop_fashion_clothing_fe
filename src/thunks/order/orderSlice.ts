import { createSlice } from '@reduxjs/toolkit';
import { getOrderThunk } from './orderThunk';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddress, IOrder, IProducts } from '~/utils/interfaces/interfaceOrder';

export interface IListOrder {
    order: IOrder[];
    products: IProducts[];
    address: IAddress;
    payment: string;
    pagination: IParamsPagination;
    isRefreshOrder: boolean;
}

const initialState: IListOrder = {
    order: [],
    products: [],
    address: {
        nameCustomer: '',
        phone: '',
        email: '',
        address: '',
    },
    payment: '',
    pagination: {},
    isRefreshOrder: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setRefreshTableTrue: (state) => {
            state.isRefreshOrder = true;
        },
        setRefreshTableFalse: (state) => {
            state.isRefreshOrder = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getOrderThunk.pending, (state, action) => {})
            .addCase(getOrderThunk.fulfilled, (state, action) => {})
            .addCase(getOrderThunk.rejected, (state, action) => {});
    },
});

export const orderActions = orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
