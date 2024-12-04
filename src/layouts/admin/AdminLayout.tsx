// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './AdminLayout.module.scss';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { icons } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const AdminLayout = (props: Props) => {
    //#region Destructuring Props
    const { content = 'AdminLayout' } = props;
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
        <div id='adminLayout' className={cx('mainAdminLayout')}>
            <div className={cx('sideBarAdmin')}>
                <img src='' alt='' />
                {t('SIDEBAR')}
            </div>
            <div className={cx('wrapperAdmin')}>
                <div className={cx('headerAdmin')}>
                    <div className={cx('searchAll')}>
                        <img src={icons.searchIcon} width={20} height={20} alt='' />
                        <input type='text' className={cx('inputSearchAll')} placeholder={t('Search product, supplier, order')} />
                    </div>
                    <div className={cx('')}>
                        <img src='' alt='' />
                        <img src={''} alt='' />
                    </div>
                </div>
                <div className={cx('contentAdmin')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
