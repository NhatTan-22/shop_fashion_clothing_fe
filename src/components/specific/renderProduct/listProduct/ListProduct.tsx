// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
// Components, Layouts, Pages
// Others
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
// Styles, Images, icons
import styles from './ListProduct.module.scss';
import ItemProduct from '../../product/ItemProduct';
import { Empty, Pagination } from 'antd';

type Props = {};

interface IOutletContextType {
    dataProduct: IProduct[];
    currentPage: IPagination;
    setParamsPage: React.Dispatch<React.SetStateAction<IParamsPagination>>;
}

const cx = classNames.bind(styles);

const ListProduct = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'ListProduct Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    const { dataProduct, currentPage, setParamsPage } = useOutletContext<IOutletContextType>();
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleChangePage = (e: number) => {
        setParamsPage((prev) => ({ ...prev, currentPage: e }));
    };
    //#endregion Handle Function

    return (
        <div id='listProductPage' className={cx('mainListProduct')}>
            {dataProduct.length > 0 ? (
                <>
                    <div className={cx('contentListProduct')}>
                        {dataProduct.map((product: IProduct) => (
                            <div key={product.slug}>
                                <ItemProduct styleItem={false} product={product} titleAdd='Buy Now' />
                            </div>
                        ))}
                    </div>
                    <Pagination
                        className={cx('footerPagination')}
                        align='end'
                        pageSize={12}
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

export default ListProduct;
