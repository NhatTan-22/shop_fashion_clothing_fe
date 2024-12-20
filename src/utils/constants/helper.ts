import { adminRoute, userRoute } from './route';

export const navigateLogin = (role?: Number) => {
    switch (role) {
        case 0: {
            return `${adminRoute.base}${adminRoute.dashboard}`;
        }
        case 1: {
            return `${userRoute.base}`;
        }
    }
};
