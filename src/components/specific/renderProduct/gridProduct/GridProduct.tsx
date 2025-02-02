// Libs
import classNames from 'classnames/bind';
import { useOutletContext } from 'react-router-dom';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './GridProduct.module.scss';

type Props = {
    products: string;
};

const cx = classNames.bind(styles);

const GridProduct = (props: Props) => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    const { products } = useOutletContext<any>();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return <div>{products}</div>;
};

export default GridProduct;
