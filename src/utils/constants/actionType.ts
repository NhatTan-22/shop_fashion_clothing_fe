export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export const GET_SUPPLIER = 'GET_SUPPLIER';
export const SEARCH_SUPPLIER = 'SEARCH_SUPPLIER';
export const ADD_SUPPLIER = 'ADD_SUPPLIER';
export const DELETE_SUPPLIER = 'DELETE_SUPPLIER';

export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_POPULAR_PRODUCT = 'GET_POPULAR_PRODUCT';
export const GET_COLOR_PRODUCT = 'GET_COLOR_PRODUCT';
export const GET_SIZE_PRODUCT = 'GET_SIZE_PRODUCT';
export const GET_DETAIL_PRODUCT = 'GET_DETAIL_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const GET_CATEGORY = 'GET_CATEGORY';
export const SEARCH_CATEGORY = 'SEARCH_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export const GET_BRAND = 'GET_BRAND';
export const SEARCH_BRAND = 'SEARCH_BRAND';
export const ADD_BRAND = 'ADD_BRAND';

export const GET_ORDER = 'GET_ORDER';
export const ADD_ORDER = 'ADD_ORDER';

export const urlApiAuth = {
    login: 'auth/login',
    register: 'auth/register',
    refreshToken: 'auth/refresh-token',
};

export const urlApiSupplier = {
    getAllSupplier: '/suppliers',
    searchSupplier: '/suppliers/select',
    addSupplier: '/suppliers/new-add',
    deleteSupplier: (_id: string) => `/suppliers/${_id}`,
};

export const urlApiProduct = {
    getAllProduct: '/products',
    getPopularProduct: '/products/popular',
    getColorProduct: '/products/colors',
    getSizeProduct: '/products/sizes',
    getDetailProduct: (slug: string) => `/products/${slug}`,
    addProduct: '/products/add-new',
    deleteProduct: (_id: string) => `/products/${_id}`,
};

export const urlApiCategory = {
    getAllCategory: '/categories',
    getSearchCategory: '/categories/select',
    addCategory: '/categories/add-new',
};

export const urlApiBrand = {
    getAllBrand: '/brands',
    getSearchBrand: '/brands/select',
    addBrand: '/brands/add-new',
};

export const urlApiOrder = {
    getAllOrder: '/orders',
    addOrder: '/orders/add-new',
};
