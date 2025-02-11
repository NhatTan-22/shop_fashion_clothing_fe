// Libs
import classNames from 'classnames/bind';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
// Components, Layouts, Pages
import { BaseButton, IconSVG, SideBar } from '~/components';
// Others
import { baseURL } from '~/utils/constants/env';
import { RootState } from '~/redux/store';
import { authActions } from '~/thunks/auth/authSlice';
import { sidebarItems } from '~/utils/constants/common';
// Styles, Images, icons
import styles from './AdminLayout.module.scss';
import { icons, images } from '~/assets';
import { ButtonStyleEnum } from '~/utils/constants/enum';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const AdminLayout = (props: Props) => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    //#endregion Declare Hook

    //#region Selector
    const admin = useAppSelector((state: RootState) => state.auth.user);
    //#endregion Selector

    //#region Declare State
    const [isOpenSideBae, setIsOpenSidebar] = useState<boolean>(false);
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    //#endregion Implement Hook

    //#region Handle Function
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsOpenSidebar(false);
        } else {
            setIsOpenSidebar(true);
        }
    };

    const handleSideBar = () => {
        setIsOpenSidebar(!isOpenSideBae);
    };
    const handleOpenDialog = () => {};

    const handleLogout = () => {
        dispatch(authActions.handleLogout());
        navigate('/auth/login');
    };
    //#endregion Handle Function

    return (
        <div id='adminLayout' className={cx('mainAdminLayout')}>
            <div className={cx(`${isOpenSideBae ? 'sideBarAdminOpen' : 'sideBarAdminClose'}`)}>
                <img className={cx('logoFashionStore')} src={images.logoFashionStore} alt='' />
                <SideBar items={sidebarItems} isOpen={isOpenSideBae} />
            </div>
            <div className={cx('wrapperAdmin')}>
                <div className={cx('headerAdmin')}>
                    <IconSVG
                        IconComponent={isOpenSideBae ? icons.listMenuIcon : icons.listItemIcon}
                        onClick={handleSideBar}
                    />
                    <div className={cx('searchAll')}>
                        <IconSVG IconComponent={icons.searchIcon} />
                        <input
                            type='text'
                            className={cx('inputSearchAll')}
                            placeholder={t('Search product, supplier, order')}
                        />
                    </div>
                    <div className={cx('information')}>
                        <IconSVG IconComponent={icons.notification} width={40} height={40} />
                        {admin && (
                            <>
                                <img
                                    className={cx('imageAvatar')}
                                    src={admin.photoUrl ? `${baseURL}/${admin.photoUrl}` : `${admin.photoUrl}`}
                                    alt=''
                                    width={40}
                                    height={40}
                                    onClick={handleOpenDialog}
                                />
                                <BaseButton
                                    styleButton={ButtonStyleEnum.TEXT}
                                    onClick={handleLogout}
                                    nameButton={`Welcome, ${admin.firstName} ${admin.lastName}!`}
                                />
                            </>
                        )}
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
