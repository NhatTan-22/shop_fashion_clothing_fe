// Libs
import classNames from 'classnames/bind';
import { useState } from 'react';
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
    styleMenu?: string;
    onClick?: () => void;
};

const cx = classNames.bind(styles);

const SideBar = (props: Props) => {
    //#region Destructuring Props
    const { items, styleMenu } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const location = useLocation();
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [selectedIndex, setSelectedIndex] = useState<string | null>(location.pathname);

    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleItemClick = (path: string) => {
        setSelectedIndex(path);
    };
    //#endregion Handle Function

    return (
        <div id='sideBarComponent' className={cx(`${styleMenu ? styleMenu : 'sideBar'}`)}>
            {items &&
                items.map((item, index) => {
                    const isActive = selectedIndex === item.path;
                    return (
                        <div key={index} className={cx(`${isActive ? 'highLightItem' : ''}`)}>
                            <Link to={`${item.path}`} onClick={() => handleItemClick(item.path)}>
                                <div className={cx('itemSideBar')}>
                                    <IconSVG IconComponent={item.icon} />
                                    {t(`${item.label}`)}
                                </div>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default SideBar;
