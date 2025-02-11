import { createSlice } from '@reduxjs/toolkit';
import { addCategoryThunk, getCategoryThunk } from './categoryThunk';

export interface ICategory {
    label?: string;
    isCheck?: boolean;
}

const initialState: ICategory = {
    label: '',
    isCheck: false,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getCategoryThunk.pending, (state, action) => {})
            .addCase(getCategoryThunk.fulfilled, (state, action) => {})
            .addCase(getCategoryThunk.rejected, (state, action) => {});

        builder
            .addCase(addCategoryThunk.pending, (state, action) => {})
            .addCase(addCategoryThunk.fulfilled, (state, action) => {})
            .addCase(addCategoryThunk.rejected, (state, action) => {});
    },
});

export const categoryActions = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
