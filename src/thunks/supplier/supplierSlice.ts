import { createSlice } from '@reduxjs/toolkit';
import { supplierThunk } from './supplierThunk';

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
            .addCase(supplierThunk.pending, (state, action) => {})
            .addCase(supplierThunk.fulfilled, (state, action) => {})
            .addCase(supplierThunk.rejected, (state, action) => {});
    },
});

export const supplierActions = supplierSlice.actions;

const supplierReducer = supplierSlice.reducer;
export default supplierReducer;
