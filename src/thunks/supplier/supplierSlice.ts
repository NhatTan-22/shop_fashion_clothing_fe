import { createSlice } from '@reduxjs/toolkit';
import { addSupplierThunk, getSupplierThunk } from './supplierThunk';

export interface ISupplier {
    supplierImage?: string;
    supplierCode?: string;
    supplierName?: string;
    supplierPhone?: string;
    supplierEmail?: string;
    supplierAddress?: string;
    supplierProduct?: string;
    isTaking?: [number];
}

const initialState: ISupplier = {
    supplierImage: '',
    supplierCode: '',
    supplierName: '',
    supplierPhone: '',
    supplierEmail: '',
    supplierAddress: '',
    supplierProduct: '',
    isTaking: [0],
};

const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getSupplierThunk.pending, (state, action) => {})
            .addCase(getSupplierThunk.fulfilled, (state, action) => {})
            .addCase(getSupplierThunk.rejected, (state, action) => {});

        builder
            .addCase(addSupplierThunk.pending, (state, action) => {})
            .addCase(addSupplierThunk.fulfilled, (state, action) => {})
            .addCase(addSupplierThunk.rejected, (state, action) => {});
    },
});

export const supplierActions = supplierSlice.actions;

const supplierReducer = supplierSlice.reducer;
export default supplierReducer;
