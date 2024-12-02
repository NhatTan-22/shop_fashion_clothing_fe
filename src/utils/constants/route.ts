import { NotFoundPage } from '~/components';
import { IRouteModel } from '../interfaces/common';
import { AboutPage, Dashboard, HomePage, Login, Register } from '~/pages';

// Path Router
export const authRoute = {
    base: '/auth',
    login: '/login',
    register: '/register',
};

export const adminRoute = {
    base: '/admin',
    dashboard: '/dashboard',
};

export const userRoute = {
    base: '/',
    home: '/home',
    products: '/products',
    cart: '/cart',
    about: '/about',
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
];
//#endregion Admin Routes

//#region Patient Routes
export const publicUserRoutes: IRouteModel[] = [
    {
        path: userRoute.home,
        component: HomePage,
    },
    {
        path: userRoute.about,
        component: AboutPage,
    },
];

export const privateUserRoutes: IRouteModel[] = [
    // {
    //   path: `${userRoute.products}${userRoute.cart}`,
    //   component: HomeUser,
    // },
];
//#endregion Patient Routes

export const publicRoutes = [...publicAuthRoutes];

export const privateRoutes = [...privateAdminRoutes, ...privateUserRoutes];
