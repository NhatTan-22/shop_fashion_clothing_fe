import { createSlice } from '@reduxjs/toolkit';
import { addSupplierThunk, deleteSupplierThunk, getSupplierThunk, searchSupplierThunk } from './supplierThunk';
import { IParamsPagination } from '~/utils/interfaces/common';

export interface ISupplier {
    suppliers: ISupplier[];
    pagination: IParamsPagination;
    isRefreshSupplier: boolean;
}

const initialState: ISupplier = {
    suppliers: [],
    pagination: {},
    isRefreshSupplier: false,
};

const supplierSlice = createSlice({
    name: 'supplier',
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
            .addCase(getSupplierThunk.pending, (state, action) => {})
            .addCase(getSupplierThunk.fulfilled, (state, action) => {})
            .addCase(getSupplierThunk.rejected, (state, action) => {});
        builder
            .addCase(searchSupplierThunk.pending, (state, action) => {})
            .addCase(searchSupplierThunk.fulfilled, (state, action) => {})
            .addCase(searchSupplierThunk.rejected, (state, action) => {});
        builder
            .addCase(addSupplierThunk.pending, (state, action) => {})
            .addCase(addSupplierThunk.fulfilled, (state, action) => {})
            .addCase(addSupplierThunk.rejected, (state, action) => {});
        builder
            .addCase(deleteSupplierThunk.pending, (state, action) => {})
            .addCase(deleteSupplierThunk.fulfilled, (state, action) => {})
            .addCase(deleteSupplierThunk.rejected, (state, action) => {});
    },
});

export const supplierActions = supplierSlice.actions;

const supplierReducer = supplierSlice.reducer;
export default supplierReducer;
