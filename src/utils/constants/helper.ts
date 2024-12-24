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

export const convertTypeSupplier = (type: number) => {
    switch (type) {
        case 1:
            return { text: 'Pending', className: 'pending' };
        case 2:
            return { text: 'Success', className: 'success' };
        default:
            return { text: 'Waiting', className: 'waiting' };
    }
};

export const renderFormatValue = (
    value: string | number | object,
    formatvalue?: string,
    callback?: (value: string | number | object) => void
) => {
    if (!value) {
        return formatvalue || '--';
    }

    return callback ? callback(value) : value;
};
