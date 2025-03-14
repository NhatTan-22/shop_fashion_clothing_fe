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
    const { items, isOpen } = props;

    const location = useLocation();
    const { t } = useTranslation();

    const menuItems = items?.map((item) => ({
        key: item.path || item.label,
        icon: <IconSVG IconComponent={item.icon} />,
        label: item.path ? (
            <Link to={item.path} className={cx('itemSideBar')}>
                {t(item.label)}
            </Link>
        ) : (
            <div className={cx('itemSideBar')}>{t(item.label)}</div>
        ),
        children: item.children?.map((child) => ({
            key: child.path,
            label: child.path ? (
                <Link to={child.path} className={cx('itemSideBar')}>
                    {t(child.label)}
                </Link>
            ) : (
                <div className={cx('itemSideBar')}>{t(child.label)}</div>
            ),
        })),
    }));

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
