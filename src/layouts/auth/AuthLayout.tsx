// Libs
import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './AuthLayout.module.scss';
import { images } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const AuthLayout = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div className={cx('mainAuthLayout')}>
            <div>
                <img className={cx('logoStoreLogin')} src={images.fashionStore} alt={t('')} />
            </div>
            <div className={cx('formLogin')}>
                {/* <div></div> */}
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
