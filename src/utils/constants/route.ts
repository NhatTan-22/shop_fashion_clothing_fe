import { GridProduct, ListProduct } from '~/components';
import { IRouteModel } from '../interfaces/common';
import {
    BlogPage,
    ContactPage,
    Dashboard,
    HomePage,
    Inventory,
    Login,
    OrderPage,
    ProductsPage,
    Register,
    Report,
    Supplier,
} from '~/pages';

// Path Router
export const authRoute = {
    base: '/auth',
    login: '/login',
    register: '/register',
};

export const adminRoute = {
    base: '/admin',
    dashboard: '/dash-board',
    inventory: '/inventory',
    reports: '/reports',
    suppliers: '/suppliers',
    orders: '/orders',
    manageStore: '/manage-store',
    settings: '/settings',
};

export const userRoute = {
    base: '/',
    home: '/home',
    products: '/products',
    list: '/list',
    blog: '/blog',
    cart: '/cart',
    order: '/order',
    contact: '/contact',
};

//#region Auth Routes
export const publicAuthRoutes: IRouteModel[] = [
    {
        path: `${authRoute.base}${authRoute.login}`,
        index: true,
        component: Login,
    },
    {
        path: `${authRoute.base}${authRoute.register}`,
        component: Register,
    },
];
//#endregion Auth Routes

//#region Admin Routes
export const privateAdminRoutes: IRouteModel[] = [
    {
        path: `${adminRoute.base}${adminRoute.dashboard}`,
        component: Dashboard,
    },
    {
        path: `${adminRoute.base}${adminRoute.inventory}`,
        component: Inventory,
    },
    {
        path: `${adminRoute.base}${adminRoute.reports}`,
        component: Report,
    },
    {
        path: `${adminRoute.base}${adminRoute.suppliers}`,
        component: Supplier,
    },
    {
        path: `${adminRoute.base}${adminRoute.orders}`,
        component: Report,
    },
    {
        path: `${adminRoute.base}${adminRoute.manageStore}`,
        component: Report,
    },
];
//#endregion Admin Routes

//#region Patient Routes
export const publicUserRoutes: IRouteModel[] = [
    {
        path: userRoute.home,
        component: HomePage,
    },
    {
        path: userRoute.products,
        component: ProductsPage,
        children: [
            {
                index: true,
                component: GridProduct,
            },
            {
                path: `${userRoute.products}${userRoute.list}`,
                component: ListProduct,
            },
        ],
    },
    {
        path: userRoute.blog,
        component: BlogPage,
    },
    {
        path: userRoute.contact,
        component: ContactPage,
    },
];

export const privateUserRoutes: IRouteModel[] = [
    {
        path: `${userRoute.products}${userRoute.order}`,
        component: OrderPage,
    },
];
//#endregion Patient Routes

export const publicRoutes = [...publicUserRoutes];

export const privateRoutes = [...privateAdminRoutes, ...privateUserRoutes];
