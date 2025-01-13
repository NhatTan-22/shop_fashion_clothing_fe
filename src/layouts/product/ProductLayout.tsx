// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
// Components, Layouts, Pages
import { BaseButton, IconSVG } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { listHeader } from '~/utils/constants/common';
// Styles, Images, icons
import { icons, images } from '~/assets';
import styles from './UserLayout.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const ProductLayout = (props: Props) => {
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
        <div id='productLayout' className={cx('mainProductLayout')}>
            <div className={cx('wrapperBody')}>
                <Outlet />
            </div>
        </div>
    );
};

export default ProductLayout;
