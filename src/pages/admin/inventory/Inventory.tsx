// Libs
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Empty, message, Pagination } from 'antd';
// Components, Layouts, Pages
import { BaseButton, BaseTable } from '~/components';
import { useAppDispatch } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { FormAddProduct } from '~/form';
// Others
import { inventoryThunk } from '~/thunks/inventory/inventoryThunk';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { renderFormatValue } from '~/utils/constants/helper';
// Styles, Images, icons
import styles from './Inventory.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Inventory = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Inventory Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    const columns: Columns<IProduct, DataType<IProduct>>[] = [
        {
            title: t('admin_products_code_label_table'),
            dataIndex: 'productCode',
            key: 'productCode',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('admin_products_name_label_table'),
            dataIndex: 'productName',
            key: 'productName',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('admin_products_image_label_table'),
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => {
                return (
                    <Avatar.Group
                        shape='circle'
                        max={{
                            count: 2,
                        }}
                    >
                        {record?.variants?.map((image, index) => {
                            return (
                                <>{image ? <Avatar key={index} src={`${image}`} /> : `${renderFormatValue(image)}`}</>
                            );
                        })}
                    </Avatar.Group>
                );
            },
        },
        {
            title: t('admin_supplier_code_label_table'),
            dataIndex: 'supplierCode',
            key: 'supplierCode',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('admin_products_categories_label_table'),
            dataIndex: 'category',
            key: 'category',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('admin_products_selling_price_label_table'),
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            render: (_, record) => {
                if (record?.price?.sellingPrice) {
                    return <p>{`${record.price.sellingPrice ?? renderFormatValue(record.price.sellingPrice)}`}</p>;
                }
            },
        },
        {
            title: t('admin_products_import_price_label_table'),
            dataIndex: 'importPrice',
            key: 'importPrice',
            render: (_, record) => {
                if (record?.price?.importPrice) {
                    return <p>{`${record.price.importPrice ?? renderFormatValue(record.price.importPrice)}`}</p>;
                }
            },
        },
        {
            title: t('admin_products_store_quantity_label_table'),
            dataIndex: 'storeQuantity',
            key: 'storeQuantity',
            render: (_, record) => {
                if (record?.variants) {
                    const totalQuantity = record.variants.reduce((total, variant) => {
                        return total + variant.storeQuantity;
                        
                    }, 0);

                    return <p>{`${totalQuantity ?? renderFormatValue(totalQuantity)}`}</p>;
                }
            },
        },
        {
            title: t('admin_products_status_label_table'),
            dataIndex: 'status',
            key: 'status',
            render: (text, _) => {
                if (text) {
                    return <p className={cx('inStock')}>${t('admin_products_in_stock_status')}</p>;
                } else {
                    return <p className={cx('outOfStock')}>{t('admin_products_in_out_of_stock_status')}</p>;
                }
            },
        },
    ];
    //#endregion Selector

    //#region Declare State
    // const [openDrawerDetail, setOpenDrawerDetail] = useState<boolean>(false);
    const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
    const [paramsPage, setParamsPage] = useState<IParamsPagination>({
        currentPage: 1,
        limitPage: 10,
    });
    const [data, setData] = useState<IProduct[]>([]);
    const [currentPage, setCurrentPage] = useState<IPagination>({
        lengthPage: 0,
        currentPage: 1,
    });
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        loadingContext?.show();
        dispatch(inventoryThunk(paramsPage))
            .unwrap()
            .then((response) => {
                if (response) {
                    const pagination = response?.pagination;
                    setData(response?.data);
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
            });
    }, [paramsPage.currentPage]);
    //#endregion Implement Hook

    //#region Handle Function
    const handleChangePage = (e: number) => {
        setParamsPage({ ...paramsPage, currentPage: e });
    };

    const handleAddProduct = () => {
        setOpenModalAddProduct(true);
    };

    const handleCloseAddProduct = () => {
        setOpenModalAddProduct(false);
    };

    const handleRowClick = (row: DataType<IProduct>) => {
        // Component detail Inventory
        console.log('Clicked row data:', row);
        // setOpenDrawerDetail(true);
    };
    //#endregion Handle Function

    return (
        <div id='inventoryComponent' className={cx('mainInventory')}>
            <div className={cx('contentInventory')}>
                <div className={cx('headerTitle')}>
                    <h1>{t('admin_overall_inventory_header')}</h1>
                </div>
                <div className={cx('bodyOverall')}>
                    <div className={cx('columnsBodyOverall')}>
                        <div className={cx('titleCategories')}>{t('admin_inventory_categories_title')}</div>
                        <h3>14</h3>
                        <div className='text-gray-400'>Last 7 days</div>
                    </div>
                    <div className={cx('columnsBodyOverall')}>
                        <div className={cx('titleTotalProduct')}>{t('admin_inventory_total_products_title')}</div>
                        <div className={cx('columnOverall')}>
                            <div className={cx('description')}>
                                <h3>868</h3>
                                <span>Last 7 days</span>
                            </div>
                            <div className={cx('description')}>
                                <h3>$25000</h3>
                                <span>Revenue</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('columnsBodyOverall')}>
                        <div className={cx('titleTopSelling')}>{t('admin_inventory_top_selling_title')}</div>
                        <div className={cx('columnOverall')}>
                            <div className={cx('description')}>
                                <h3>5</h3>
                                <span>Last 7 days</span>
                            </div>
                            <div className={cx('description')}>
                                <h3>$2500</h3>
                                <span>Cost</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('columnsBodyOverall')}>
                        <div className={cx('titleLowStocks')}>{t('admin_inventory_low_stocks_title')}</div>
                        <div className={cx('columnOverall')}>
                            <div className={cx('description')}>
                                <h3>12</h3>
                                <span>Ordered</span>
                            </div>
                            <div className={cx('description')}>
                                <h3>2</h3>
                                <span>Not in stock</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('contentProductsInventory')}>
                <div className={cx('headerInventory')}>
                    <div className={cx('headerTitle')}>
                        <h1>{t('admin_products_header')}</h1>
                    </div>
                    <div className={cx('headerButtons')}>
                        <BaseButton
                            nameButton={t('common_add_product')}
                            title={t('common_add_product')}
                            styleButton={ButtonStyleEnum.PRIMARY}
                            onClick={handleAddProduct}
                        />
                        <BaseButton
                            nameButton={t('common_filters')}
                            title={t('common_filters')}
                            styleButton={ButtonStyleEnum.PRIMARY}
                        />
                    </div>
                </div>

                <>
                    {data.length ? (
                        <div className={cx('bodyInventory')}>
                            <BaseTable columns={columns} dataSource={data} onClick={handleRowClick} />
                            <div className={cx('footerPagination')}>
                                <Pagination
                                    className={cx('footerPagination')}
                                    align='center'
                                    defaultCurrent={currentPage.currentPage}
                                    total={currentPage.lengthPage}
                                    showSizeChanger={false}
                                    onChange={handleChangePage}
                                />
                            </div>
                        </div>
                    ) : (
                        <Empty className={cx('bodyEmptySupplier')} />
                    )}
                </>
            </div>

            <>
                <FormAddProduct isShowModal={openModalAddProduct} onCancel={handleCloseAddProduct} />
            </>
        </div>
    );
};

export default Inventory;
