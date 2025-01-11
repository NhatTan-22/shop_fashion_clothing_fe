// Libs
import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { IconSVG, SideBar } from '~/components';
// Others
import { sidebarItems } from '~/utils/constants/common';
// Styles, Images, icons
import styles from './AdminLayout.module.scss';
import { icons, images } from '~/assets';
import { useEffect, useState } from 'react';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const AdminLayout = (props: Props) => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const [isOpenSideBae, setIsOpenSidebar] = useState<boolean>(true);
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
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
    //#endregion Handle Function

    return (
        <div id='adminLayout' className={cx('mainAdminLayout')}>
            <div className={cx(`${isOpenSideBae ? 'sideBarAdminOpen' : 'sideBarAdminClose'}`)}>
                <img className={cx('logoFashionStore')} src={images.logoFashionStore} alt='' />
                {isOpenSideBae && <SideBar items={sidebarItems} />}
            </div>
            <div className={cx('wrapperAdmin')}>
                <div className={cx('headerAdmin')}>
                    <IconSVG IconComponent={icons.listMenuIcon} onClick={handleSideBar} />
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
                        <img
                            className={cx('imageAvatar')}
                            src={images.fashionStore}
                            alt=''
                            width={40}
                            height={40}
                            onClick={handleOpenDialog}
                        />
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
