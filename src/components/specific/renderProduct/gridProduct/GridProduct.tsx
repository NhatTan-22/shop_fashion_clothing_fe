// Libs
import classNames from 'classnames/bind';
import { useOutletContext } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Empty, message, Pagination } from 'antd';
import ItemProduct from '../../product/ItemProduct';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './GridProduct.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { getProductThunk } from '~/thunks/product/productThunk';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { productActions } from '~/thunks/product/productSlice';

type Props = {
    products: string;
};

const cx = classNames.bind(styles);

const GridProduct = (props: Props) => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    // const { products } = useOutletContext<any>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    const isRefreshTable = useAppSelector((state) => state.product.isRefreshSupplier);
    //#endregion Selector

    //#region Declare State
    const [dataProduct, setDataProduct] = useState<IProduct[]>([]);
    const [paramsPage, setParamsPage] = useState<IParamsPagination>({
        currentPage: 1,
        limitPage: 10,
    });
    const [currentPage, setCurrentPage] = useState<IPagination>({
        lengthPage: 0,
        currentPage: 1,
    });
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        loadingContext?.show();
        dispatch(getProductThunk(paramsPage))
            .unwrap()
            .then((response) => {
                if (response) {
                    const pagination = response?.pagination;
                    setDataProduct(response?.data);
                    setCurrentPage({
                        lengthPage: pagination.lengthPage,
                        currentPage: pagination.currentPage,
                    });
                }
            })
            .catch((error) => {
                message.error(error?.message);
            })
            .finally(() => {
                loadingContext?.hide();
                dispatch(productActions.setRefreshTableFalse());
            });
    }, [paramsPage.currentPage, isRefreshTable, paramsPage]);
    //#endregion Implement Hook

    //#region Handle Function
    const handleChangePage = (e: number) => {
        setParamsPage({ ...paramsPage, currentPage: e });
    };
    //#endregion Handle Function

    return (
        <div id='gridProductPage' className={cx('mainGridProduct')}>
            {dataProduct.length > 0 ? (
                <>
                    <div className={cx('contentGridProduct')}>
                        {dataProduct.map((product: IProduct) => (
                            <div key={product.slug}>
                                <ItemProduct product={product} titleAdd='Buy Now' />
                            </div>
                        ))}
                    </div>
                    <Pagination
                        className={cx('footerPagination')}
                        align='end'
                        pageSize={paramsPage.limitPage}
                        total={currentPage.lengthPage}
                        current={currentPage.currentPage}
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
