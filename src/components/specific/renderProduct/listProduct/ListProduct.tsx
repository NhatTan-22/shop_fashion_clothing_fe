// Libs
import classNames from 'classnames/bind';
import { useOutletContext } from 'react-router-dom';
import { Empty, Pagination } from 'antd';
// Components, Layouts, Pages
// Others
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import ItemProduct from '~/components/specific/product/ItemProduct';
// Styles, Images, icons
import styles from './ListProduct.module.scss';

type Props = {};

interface IOutletContextType {
    products: IProduct[];
    pagination: IPagination;
    updateFilters: React.Dispatch<React.SetStateAction<IParamsPagination>>;
}

const cx = classNames.bind(styles);

const ListProduct = (props: Props) => {
    // const { content = 'ListProduct Component' } = props;

    const { products, pagination, updateFilters } = useOutletContext<IOutletContextType>();

    //#region Handle Function
    const handleChangePage = (e: number) => {
        updateFilters((prev) => ({ ...prev, currentPage: e }));
    };
    //#endregion Handle Function

    return (
        <div id='listProductPage' className={cx('mainListProduct')}>
            {products.length > 0 ? (
                <>
                    <div className={cx('contentListProduct')}>
                        {products.map((product: IProduct) => (
                            <div key={product.slug}>
                                <ItemProduct styleItem={false} product={product} titleAdd='Buy Now' />
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

export default ListProduct;
