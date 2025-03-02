import { GridProduct, ListProduct } from '~/components';
import { IRouteModel } from '../interfaces/common';
import {
    BlogPage,
    Brand,
    Category,
    ContactPage,
    Dashboard,
    HomePage,
    Inventory,
    Login,
    Order,
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
    products: '/products',
    categories: '/categories',
    brands: '/brands',
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
    detail: '/detail',
    list: '/list',
    blog: '/blog',
    cart: '/cart',
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
        path: `${adminRoute.base}${adminRoute.inventory}${adminRoute.products}`,
        component: Inventory,
    },
    {
        path: `${adminRoute.base}${adminRoute.inventory}${adminRoute.categories}`,
        component: Category,
    },
    {
        path: `${adminRoute.base}${adminRoute.inventory}${adminRoute.brands}`,
        component: Brand,
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
        component: Order,
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
        path: `${userRoute.products}${userRoute.cart}`,
        component: OrderPage,
    },
    {
        path: `${userRoute.products}${userRoute.detail}/:slug`,
        component: OrderPage,
    },
];
//#endregion Patient Routes

export const publicRoutes = [...publicUserRoutes];

export const privateRoutes = [...privateAdminRoutes, ...privateUserRoutes];
