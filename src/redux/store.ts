import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/thunks/auth/authSlice';
import productReducer from '~/thunks/product/productSlice';
import supplierReducer from '~/thunks/supplier/supplierSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    supplier: supplierReducer,
    product: productReducer,
});

export function makeStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        // devTools: process.env.NODE_ENV !== 'production',
    });
}

const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
