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
   
    const { children } = props;
    

    
    const navigate = useNavigate();
    let location = useLocation();
    

    
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken);
    

    
    const [isMounted, setIsMounted] = useState(false);
    

    
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

   

    //#region Handle Function
    //#endregion Handle Function
    if (!isMounted) return null;
    return <>{children}</> || null;
};

export default ProtectedRoute;
