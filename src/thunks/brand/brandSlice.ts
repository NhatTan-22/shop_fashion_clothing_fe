import { createSlice } from '@reduxjs/toolkit';
import { addBrandThunk, getBrandThunk, searchBrandThunk } from './brandThunk';

export interface IBrand {
    refreshTable: boolean;
}

const initialState: IBrand = {
    refreshTable: false,
};

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setRefreshTableTrue: (state) => {
            state.refreshTable = true;
        },
        resetRefreshTable: (state) => {
            state.refreshTable = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getBrandThunk.pending, (state, action) => {})
            .addCase(getBrandThunk.fulfilled, (state, action) => {})
            .addCase(getBrandThunk.rejected, (state, action) => {});
        builder
            .addCase(searchBrandThunk.pending, (state, action) => {})
            .addCase(searchBrandThunk.fulfilled, (state, action) => {})
            .addCase(searchBrandThunk.rejected, (state, action) => {});
        builder
            .addCase(addBrandThunk.pending, (state, action) => {})
            .addCase(addBrandThunk.fulfilled, (state, action) => {})
            .addCase(addBrandThunk.rejected, (state, action) => {});
    },
});

export const brandActions = brandSlice.actions;

const brandReducer = brandSlice.reducer;
export default brandReducer;
