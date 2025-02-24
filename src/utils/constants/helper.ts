import { adminRoute, userRoute } from './route';

export const navigateLogin = (role?: Number) => {
    switch (role) {
        case 0: {
            return `${adminRoute.base}${adminRoute.dashboard}`;
        }
        case 1: {
            return `${userRoute.home}`;
        }
        default:
            return `${userRoute.home}`;
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
    value: string | number | Object,
    formatvalue?: string,
    callback?: (value: string | number | Object) => void
) => {
    if (!value) {
        return formatvalue || '--';
    }

    return callback ? callback(value) : value;
};

export const renderFormatDate = (
    value: string | Date,
    format: string = 'DD-MM-YYYY',
    callback?: (formattedDate: string) => void
) => {
    if (!value) return '--/--/--';

    const date = new Date(value);
    if (isNaN(date.getTime())) return '--/--/--';

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    let formattedDate = format.replace('DD', day).replace('MM', month).replace('YYYY', String(year));

    return callback ? callback(formattedDate) : formattedDate;
};
