// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './AuthLayout.module.scss';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(styles);

const AuthLayout = () => {
    return (
        <div>
            <div>
                <img src="" alt="" />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
