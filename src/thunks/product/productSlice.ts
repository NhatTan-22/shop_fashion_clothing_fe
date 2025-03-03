import { createSlice } from '@reduxjs/toolkit';
import { IParamsPagination } from '~/utils/interfaces/common';
import { addProductThunk, deleteProductThunk, getDetailProductThunk, getProductThunk } from './productThunk';

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
            .addCase(getDetailProductThunk.pending, (state, action) => {})
            .addCase(getDetailProductThunk.fulfilled, (state, action) => {})
            .addCase(getDetailProductThunk.rejected, (state, action) => {});

        builder
            .addCase(addProductThunk.pending, (state, action) => {})
            .addCase(addProductThunk.fulfilled, (state, action) => {})
            .addCase(addProductThunk.rejected, (state, action) => {});

        builder
            .addCase(deleteProductThunk.pending, (state, action) => {})
            .addCase(deleteProductThunk.fulfilled, (state, action) => {})
            .addCase(deleteProductThunk.rejected, (state, action) => {});
    },
});

export const productActions = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
