import { createSlice } from '@reduxjs/toolkit';
import { inventoryThunk } from './inventoryThunk';

export interface IInventory {
    productCode?: string;
    productName?: string;
    image?: string;
    supplierCode?: string;
    category?: string;
    sellingPrice?: string;
    importPrice?: string;
    storeQuantity?: string;
    status?: boolean;
}

const initialState: IInventory = {
    productCode: '',
    productName: '',
    image: '',
    supplierCode: '',
    category: '',
    sellingPrice: '',
    storeQuantity: '',
    status: false,
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(inventoryThunk.pending, (state, action) => {})
            .addCase(inventoryThunk.fulfilled, (state, action) => {})
            .addCase(inventoryThunk.rejected, (state, action) => {});
    },
});

export const inventoryActions = inventorySlice.actions;

const inventoryReducer = inventorySlice.reducer;
export default inventoryReducer;
