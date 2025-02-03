// Libs
import classNames from 'classnames/bind';
import { useOutletContext } from 'react-router-dom';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './GridProduct.module.scss';
import { Empty, Pagination } from 'antd';
import ItemProduct from '../../product/ItemProduct';
import IconSVG from '~/components/common/icon/IconSVG';
import { icons } from '~/assets';
import { useEffect, useState } from 'react';

type Props = {
    products: string;
};

const cx = classNames.bind(styles);

const GridProduct = (props: Props) => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    const { products } = useOutletContext<any>();
    const [dataProduct, setDataProduct] = useState([]);
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        setDataProduct(products);
    }, [products]);
    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div id='gridProductPage' className={cx('mainGridProduct')}>
            {dataProduct && dataProduct.length > 0 ? (
                <>
                    <div className={cx('contentGridProduct')}>
                        {dataProduct.map((product: any, index: number) => (
                            <ItemProduct key={index} product={product} />
                        ))}
                    </div>
                    <div className={cx('paginationGridProduct')}>
                        <Pagination align='end' total={20} defaultCurrent={1} />
                    </div>
                </>
            ) : (
                <Empty description={false} className={cx('emptyGridProduct')} />
            )}
        </div>
    );
};

export default GridProduct;
