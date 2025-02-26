// Libs
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Dropdown, Empty, message, Pagination, Table, Tag } from 'antd';
// Components, Layouts, Pages
import { IconSVG } from '~/components';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { FormAddProduct } from '~/form';
// Others
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { renderFormatValue } from '~/utils/constants/helper';
import { getProductThunk } from '~/thunks/product/productThunk';
import { baseURL } from '~/utils/constants/env';
import { ICategory } from '~/utils/interfaces/interfaceCategory';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { productActions } from '~/thunks/product/productSlice';
// Styles, Images, icons
import styles from './Inventory.module.scss';
import { icons } from '~/assets';

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
    const isRefreshTable = useAppSelector((state) => state.product.isRefreshSupplier);

    const columns: Columns<IProduct, DataType<IProduct>>[] = [
        {
            title: t('admin_products_code_label_table'),
            dataIndex: 'sku',
            key: 'sku',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('admin_products_image_label_table'),
            dataIndex: 'images',
            key: 'images',
            render: (_, record) => {
                if (record?.images) {
                    return (
                        <Avatar.Group
                            shape='circle'
                            max={{
                                count: 2,
                            }}
                        >
                            {record.images.map((image, index) => (
                                <Avatar
                                    key={`${record._id}_image_${index}`}
                                    src={`${baseURL}/${image}`}
                                    alt={record.name}
                                />
                            ))}
                        </Avatar.Group>
                    );
                }
            },
        },
        {
            title: t('admin_products_name_label_table'),
            dataIndex: 'name',
            key: 'name',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },

        {
            title: t('admin_supplier_name_label_table'),
            dataIndex: 'supplier',
            key: 'supplier',
            render: (_, record) => {
                if (record?.supplier) {
                    const supplier = record.supplier as ISupplier | string;
                    return <p>{`${typeof supplier === 'object' && renderFormatValue(supplier.supplierName)}`}</p>;
                }
            },
        },
        {
            title: t('admin_products_categories_label_table'),
            dataIndex: 'category',
            key: 'category',
            render: (_, record) => {
                if (record?.category) {
                    const category = record.category as ICategory | string;
                    return <p>{`${typeof category === 'object' && renderFormatValue(category.name)}`}</p>;
                }
            },
        },
        {
            title: t('admin_products_selling_price_label_table'),
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => {
                if (record?.pricing) {
                    return <p>{`${record.pricing.price ?? renderFormatValue(record.pricing.price)}`}</p>;
                }
            },
        },
        {
            title: t('admin_products_import_price_label_table'),
            dataIndex: 'promotionPrice',
            key: 'promotionPrice',
            render: (_, record) => {
                if (record?.pricing) {
                    return (
                        <p>{`${record.pricing.promotionPrice ?? renderFormatValue(record.pricing.promotionPrice)}`}</p>
                    );
                }
            },
        },
        {
            title: t('admin_products_store_quantity_label_table'),
            dataIndex: 'stock',
            key: 'stock',
            render: (_, record) => {
                if (record?.stock) {
                    return <p>{`${record.stock ?? renderFormatValue(record.stock)}`}</p>;
                }
            },
        },
        {
            title: t('admin_products_status_label_table'),
            dataIndex: 'status',
            key: 'status',
            render: (text, _) => {
                if (text) {
                    return <Tag color='green'>{t('admin_products_in_stock_status')}</Tag>;
                } else {
                    return <Tag color='red'>{t('admin_products_in_out_of_stock_status')}</Tag>;
                }
            },
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                if (record) {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: `common_detail_${record._id}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_detail')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.eyeIcon} />,
                                        // onClick: () => handleEditSupplier(record),
                                    },
                                    {
                                        key: `common_edit_${record._id}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_edit')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.editIcon} />,
                                        // onClick: () => handleEditSupplier(record),
                                    },
                                    {
                                        key: `common_delete_${record._id}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_delete')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.deleteIcon} />,
                                        // onClick: () => handleDeleteSupplier(record),
                                    },
                                ],
                            }}
                            trigger={['click']}
                        >
                            <div>
                                <IconSVG IconComponent={icons.dotVerticalIcon} />
                            </div>
                        </Dropdown>
                    );
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
        dispatch(getProductThunk(paramsPage))
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
                dispatch(productActions.setRefreshTableFalse());
            });
    }, [paramsPage.currentPage, isRefreshTable, paramsPage]);
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
                        <Button size='large' type='primary' onClick={handleAddProduct}>
                            {t('common_add_product')}
                        </Button>
                        <Button size='large' type='primary'>{`${t('common_filters')}`}</Button>
                    </div>
                </div>

                <>
                    {data.length ? (
                        <div className={cx('bodyInventory')}>
                            <Table
                                rowKey={(record) => record.sku}
                                tableLayout='auto'
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                                scroll={{ x: 400, y: 390 }}
                            />
                            <Pagination
                                className={cx('footerPagination')}
                                align='center'
                                pageSize={paramsPage.limitPage}
                                total={currentPage.lengthPage}
                                current={currentPage.currentPage}
                                showSizeChanger={false}
                                onChange={handleChangePage}
                            />
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
