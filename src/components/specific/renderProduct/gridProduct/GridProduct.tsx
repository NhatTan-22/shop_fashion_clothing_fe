// Libs
import classNames from 'classnames/bind';
import { Empty, Pagination } from 'antd';
import { useOutletContext } from 'react-router-dom';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './GridProduct.module.scss';
import { useTranslation } from 'react-i18next';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import ItemProduct from '../../product/ItemProduct';

type Props = {
    // products: string;
};
interface IOutletContextType {
    products: IProduct[];
    pagination: IPagination;
    updateFilters: React.Dispatch<React.SetStateAction<IParamsPagination>>;
}

const cx = classNames.bind(styles);

const GridProduct = (props: Props) => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    // const { products } = useOutletContext<any>();
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    const { products, pagination, updateFilters } = useOutletContext<IOutletContextType>();
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleChangePage = (e: number) => {
        updateFilters((prev) => ({ ...prev, currentPage: e }));
    };
    //#endregion Handle Function

    return (
        <div id='gridProductPage' className={cx('mainGridProduct')}>
            {products.length > 0 ? (
                <>
                    <div className={cx('contentGridProduct')}>
                        {products.map((product: IProduct) => (
                            <div key={product.slug}>
                                <ItemProduct product={product} titleAdd='Buy Now' />
                            </div>
                        ))}
                    </div>
                    <Pagination
                        className={cx('footerPagination')}
                        align='end'
                        pageSize={12}
                        total={pagination.lengthPage}
                        current={pagination.currentPage}
                        showSizeChanger={false}
                        onChange={handleChangePage}
                    />
                </>
            ) : (
                <Empty description={false} className={cx('emptyGridProduct')} />
            )}
        </div>
    );
};

export default GridProduct;
