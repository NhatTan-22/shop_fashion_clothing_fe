// Libs
import classNames from 'classnames/bind';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import IconSVG from '~/components/common/icon/IconSVG';
// Others
import { ISideBar } from '~/utils/interfaces/common';
// Styles, Images, icons
import styles from './SideBar.module.scss';

type Props = {
    items?: ISideBar[];
    isOpen: boolean;
};

const cx = classNames.bind(styles);

const SideBar = (props: Props) => {
    //#region Destructuring Props
    const { items, isOpen } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const location = useLocation();
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    const menuItems = items?.map((item) => ({
        key: item.path,
        icon: <IconSVG IconComponent={item.icon} />,
        label: (
            <Link to={item.path} className={cx('itemSideBar')}>
                {t(item.label)}
            </Link>
        ),
        children: item.children?.map((child) => ({
            key: child.path,
            label: (
                <Link to={child.path} className={cx('itemSideBar')}>
                    {t(child.label)}
                </Link>
            ),
        })),
    }));
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    // const handleItemClick = (path: string) => {
    //     setSelectedIndex(path);
    // };
    //#endregion Handle Function

    return (
        <div id='sideBarComponent' className={cx('mainSideBar')}>
            <Menu selectedKeys={[location.pathname]} mode='inline' inlineCollapsed={!isOpen} items={menuItems} />
        </div>
    );
};

export default SideBar;
