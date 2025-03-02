// Libs
import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './UserLayout.module.scss';

type Props = {
};

const cx = classNames.bind(styles);

const ProductLayout = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
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
