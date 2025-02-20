import { createSlice } from '@reduxjs/toolkit';
import { IParamsPagination } from '~/utils/interfaces/common';
import { addProductThunk, getProductThunk } from './productThunk';

export interface IProduct {
    products: IProduct[];
    pagination: IParamsPagination;
    isRefreshSupplier: boolean;
}

const initialState: IProduct = {
    products: [],
    pagination: {},
    isRefreshSupplier: false,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setRefreshTableTrue: (state) => {
            state.isRefreshSupplier = true;
        },
        setRefreshTableFalse: (state) => {
            state.isRefreshSupplier = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getProductThunk.pending, (state, action) => {})
            .addCase(getProductThunk.fulfilled, (state, action) => {})
            .addCase(getProductThunk.rejected, (state, action) => {});

        builder
            .addCase(addProductThunk.pending, (state, action) => {})
            .addCase(addProductThunk.fulfilled, (state, action) => {})
            .addCase(addProductThunk.rejected, (state, action) => {});
    },
});

export const productActions = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
