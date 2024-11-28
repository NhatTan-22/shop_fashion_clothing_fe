import { NotFoundPage } from '../../components';
import { IRouteModel } from '../interfaces/common';
import { HomePage, Login, Register } from '../../pages';

// Path Router
export const authRoute = {
    base: '/auth',
    login: '/login',
    register: '/register'
};

export const adminRoute = {
    base: '/admin',
    dashboard: '/dashboard',
};

export const userRoute = {
    base: '/',
    home: '/home',
    products: '/products',
    cart: '/cart'
};

//#region Auth Routes
export const publicAuthRoutes: IRouteModel[] = [
    {
        path: '*',
        component: NotFoundPage,
    },
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
        path: '*',
        component: NotFoundPage,
    },
    // {
    //     path: `${adminRoute.base}${adminRoute.dashboard}`,
    //     component: DashboardAdmin,
    //     name: 'Dashboard',
    // },
];
//#endregion Admin Routes

//#region Patient Routes
export const publicUserRoutes: IRouteModel[] = [
    {
        path: '*',
        component: NotFoundPage,
    },
    {
        path: userRoute.home,
        component: HomePage,
      },
    // {
    //   path: userRoute.products,
    //   component: AboutUser,
    // },
];

export const privateUserRoutes: IRouteModel[] = [
    {
        path: '*',
        component: NotFoundPage,
    },
    // {
    //   path: `${userRoute.products}${userRoute.cart}`,
    //   component: HomeUser,
    // },
];
//#endregion Patient Routes

export const publicRoutes = [...publicUserRoutes];

export const privateRoutes = [...privateAdminRoutes, ...privateUserRoutes];
