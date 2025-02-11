export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export const GET_SUPPLIER = 'GET_SUPPLIER';
export const ADD_SUPPLIER = 'ADD_SUPPLIER';

export const GET_INVENTORY = 'GET_INVENTORY';
export const ADD_INVENTORY = 'ADD_INVENTORY';

export const GET_CATEGORY = 'GET_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export const urlApiAuth = {
    login: 'auth/login',
    register: 'auth/register',
    refreshToken: 'auth/refresh-token',
};

export const urlApiSupplier = {
    getAllSupplier: '/suppliers',
    addSupplier: '/suppliers/new-add',
};

export const urlApiInventory = {
    getAllInventory: '/products',
    addInventory: '/products/add-new',
};

export const urlApiCategory = {
    getAllCategory: '/categories',
    addCategory: '/categories/add-new',
};
