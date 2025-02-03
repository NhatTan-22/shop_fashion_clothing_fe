// Libs
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/redux/hooks';
// Components, Layouts, Pages
// Others
// Styles, Images, icons1

type Props = {
    children?: JSX.Element;
};

const ProtectedRoute = (props: Props) => {
    //#region Destructuring Props
    const { children } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    let location = useLocation();
    //#endregion Declare Hook

    //#region Selector
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken);
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    if (!isAuthenticated && (!user?.role || user?.role)) {
        return <Navigate to='/auth/login' state={{ from: location }} replace />;
    }
    //#endregion Handle Function

    return children;
};

export default ProtectedRoute;
