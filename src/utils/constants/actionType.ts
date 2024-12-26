export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export const GET_SUPPLIER = 'GET_SUPPLIER';
export const ADD_SUPPLIER = 'ADD_SUPPLIER';

export const GET_INVENTORY = 'GET_INVENTORY';
export const ADD_INVENTORY = 'ADD_INVENTORY';

export const urlApiAuth = {
    login: 'auth/login',
    register: 'auth/register',
    refreshToken: 'auth/refresh-token',
};

export const urlApiSupplier = {
    getAllSupplier: '/admin/suppliers',
};

export const urlApiInventory = {
    getAllInventory: '/admin/products',
};
