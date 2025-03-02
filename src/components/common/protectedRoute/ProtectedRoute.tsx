// Libs
import { useEffect, useState } from 'react';
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
    const [isMounted, setIsMounted] = useState(false);
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        if (typeof user?.role === 'number') {
            const route = navigateLogin(user.role);
            if (location.pathname.startsWith('/admin') && user.role !== 0) {
                navigate(userRoute.home, { replace: true });
            }

            if (location.pathname === '/' || location.pathname === '/auth/login') {
                if (location.pathname !== route) {
                    navigate(route, { replace: true });
                }
            }
        } else if (!user || !isAuthenticated) {
            navigate('/auth/login');
        }
        setTimeout(() => {
            setIsMounted(true);
        }, 1);
    }, [isAuthenticated, user, location.pathname, navigate]);

    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function
    if (!isMounted) return;
    return children;
};

export default ProtectedRoute;
