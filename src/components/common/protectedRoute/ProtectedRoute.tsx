// Libs
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/redux/hooks';
import { navigateLogin } from '~/utils/constants/helper';
import { userRoute } from '~/utils/constants/route';
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
    const navigate = useNavigate();
    let location = useLocation();
    //#endregion Declare Hook

    //#region Selector
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken);
    //#endregion Selector

    //#region Declare State
    console.log(user)
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        if (typeof user?.role === 'number') {
            const route = navigateLogin(user.role);
            if (location.pathname === '/' || location.pathname === '/auth/login') {
                if (location.pathname !== route) {
                    navigate(route, { replace: true });
                }
            }
        } else if (!user) {
            navigate(userRoute.home, { replace: true });
        } else if (!isAuthenticated) {
            navigate('/auth/login');
        }
    }, [isAuthenticated, user, location.pathname, navigate]);

    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return children;
};

export default ProtectedRoute;