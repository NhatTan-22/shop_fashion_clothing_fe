import { createSlice } from '@reduxjs/toolkit';
import { addCategoryThunk, getCategoryThunk, searchCategoryThunk } from './categoryThunk';

export interface ICategory {
    label?: string;
    isCheck?: boolean;
    refreshTable: boolean;
}

const initialState: ICategory = {
    label: '',
    isCheck: false,
    refreshTable: false,
};

const categorySlice = createSlice({
    name: 'category',
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
            .addCase(getCategoryThunk.pending, (state, action) => {})
            .addCase(getCategoryThunk.fulfilled, (state, action) => {})
            .addCase(getCategoryThunk.rejected, (state, action) => {});
        builder
            .addCase(searchCategoryThunk.pending, (state, action) => {})
            .addCase(searchCategoryThunk.fulfilled, (state, action) => {})
            .addCase(searchCategoryThunk.rejected, (state, action) => {});
        builder
            .addCase(addCategoryThunk.pending, (state, action) => {})
            .addCase(addCategoryThunk.fulfilled, (state, action) => {})
            .addCase(addCategoryThunk.rejected, (state, action) => {});
    },
});

export const categoryActions = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
