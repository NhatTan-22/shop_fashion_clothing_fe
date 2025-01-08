// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { Slider } from '~/components';
// Others
// Styles, Images, icons
import styles from './ProductsPage.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const ProductsPage = (props: Props) => {
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
        <div id='productsPage' className={cx('mainProductsPage')}>
            <div>{content}</div>
        </div>
    );
};

export default ProductsPage;
