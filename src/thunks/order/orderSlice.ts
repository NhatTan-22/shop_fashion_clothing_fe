import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderThunk } from './orderThunk';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddOrder, IAddress, IProducts } from '~/utils/interfaces/interfaceOrder';

export interface IListOrder {
    order: IAddOrder;
    pagination: IParamsPagination;
    isRefreshOrder: boolean;
}

const initialState: IListOrder = {
    order: JSON.parse(localStorage.getItem('order') || 'null') || {
        userId: '',
        address: {
            nameCustomer: '',
            phone: '',
            address: '',
        },
        products: [],
        totalPrice: 0,
        paymentMethod: '',
        discount: '',
    },
    pagination: {},
    isRefreshOrder: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProducts>) => {
            state.order = {
                ...state.order,
                products: [action.payload],
                totalPrice: action.payload.price * action.payload.quantity,
            };

            localStorage.setItem('order', JSON.stringify(state.order));
        },

        // addDiscount: (state, action: PayloadAction<>) => {
        //     state.order.totalPrice += action.payload.price * action.payload.quantity - action.payload;

        //     localStorage.setItem('order', JSON.stringify({ ...state.order }));
        // },

        updateShippingAddress: (state, action: PayloadAction<{ shippingAddress: IAddress }>) => {
            state.order.address = action.payload.shippingAddress;

            localStorage.setItem('order', JSON.stringify(state.order));
        },

        updatePaymentMethod: (state, action: PayloadAction<{ paymentMethod: string }>) => {
            state.order.paymentMethod = action.payload.paymentMethod;

            localStorage.setItem('order', JSON.stringify(state.order));
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; color: string; size: string; quantity: number }>
        ) => {
            state.order.products = state.order.products.map((item) =>
                item.productId === action.payload.id &&
                item.color === action.payload.color &&
                item.size === action.payload.size
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

            state.order.totalPrice = state.order.products.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            localStorage.setItem('order', JSON.stringify(state.order));
        },

        removeProduct: (state, action: PayloadAction<{ id: string; color: string; size: string }>) => {
            const filteredProducts = state.order.products.filter(
                (item) =>
                    !(
                        item.productId === action.payload.id &&
                        item.color === action.payload.color &&
                        item.size === action.payload.size
                    )
            );

            state.order.products = filteredProducts;

            state.order.totalPrice = filteredProducts.reduce((total, item) => total + item.price * item.quantity, 0);
            const updatedOrder = {
                ...state.order,
                products: [...state.order.products],
            };

            localStorage.setItem('order', JSON.stringify(updatedOrder));
        },

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
