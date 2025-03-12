// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Empty, message, Pagination, Table, Tag } from 'antd';
// Components, Layouts, Pages
import { IconSVG } from '~/components';
// Others
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { supplierActions } from '~/thunks/supplier/supplierSlice';
import { LoadingContext } from '~/context';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { getOrderThunk } from '~/thunks/order/orderThunk';
import { renderFormatValue } from '~/utils/constants/helper';
import { baseURL } from '~/utils/constants/env';
import { IOrder } from '~/utils/interfaces/interfaceOrder';
import { IUser } from '~/utils/interfaces/auth';
// Styles, Images, icons
import styles from './Order.module.scss';
import { icons } from '~/assets';
import { IProduct } from '~/utils/interfaces/interfaceProduct';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Order = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Supplier Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    const isRefreshTable = useAppSelector((state) => state.supplier.isRefreshSupplier);

    const columns: Columns<IOrder, DataType<IOrder>>[] = [
        {
            key: 'sku',
            title: `${t('admin_order_sku_label_table')}`,
            dataIndex: 'sku',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'userId',
            title: `${t('admin_order_client_label_table')}`,
            dataIndex: 'userId',
            render: (_, record) => {
                const user = record.userId as IUser;
                if (user && typeof user === 'object') {
                    return (
                        <p>{`${user.firstName ?? renderFormatValue(user.firstName)} ${
                            user.lastName ?? renderFormatValue(user.lastName)
                        }`}</p>
                    );
                }
            },
        },
        {
            key: 'images',
            title: `${t('admin_order_image_product_label_table')}`,
            dataIndex: 'images',
            render: (_, record) => {
                if (record.products && record.products.length) {
                    return (
                        <div>
                            {record.products.map((product, productIndex) => {
                                const productDetails = product.productId as IProduct;
                                if (
                                    productDetails &&
                                    typeof productDetails === 'object' &&
                                    productDetails.images &&
                                    productDetails.images.length
                                ) {
                                    return (
                                        <div key={`product-${productIndex}`} style={{ marginBottom: '4px' }}>
                                            <Avatar.Group
                                                shape='circle'
                                                max={{
                                                    count: 2,
                                                }}
                                            >
                                                {productDetails.images.map((image, index) => (
                                                    <Avatar
                                                        key={`${productDetails._id}_image_${index}`}
                                                        src={`${baseURL}/${image}`}
                                                        alt={productDetails.name}
                                                    />
                                                ))}
                                            </Avatar.Group>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    );
                }
            },
        },
        {
            key: 'name',
            title: `${t('admin_order_product_name_label_table')}`,
            dataIndex: 'name',
            render: (_, record) => {
                if (record.products && record.products.length) {
                    return record.products.map((product, index) => {
                        const productDetails = product.productId as IProduct;

                        return (
                            <div key={index}>
                                <p>{`item ${index} - ${
                                    productDetails.name ?? renderFormatValue(productDetails.name)
                                }`}</p>
                            </div>
                        );
                    });
                }
            },
        },
        {
            key: 'color',
            title: `${t('admin_order_color_label_table')}`,
            dataIndex: 'color',
            render: (_, record) => {
                if (record.products && record.products.length) {
                    return record.products.map((product, index) => {
                        return (
                            <div key={`product-${index}`} style={{ marginBottom: '4px' }}>
                                item {index} -{' '}
                                <Tag color={product.color}>{`${
                                    product.color ?? renderFormatValue(product.color)
                                }`}</Tag>
                            </div>
                        );
                    });
                }
            },
        },
        {
            key: 'size',
            title: `${t('admin_order_size_label_table')}`,
            dataIndex: 'size',
            render: (_, record) => {
                if (record.products && record.products.length) {
                    return record.products.map((product, index) => {
                        return (
                            <div key={`product-${index}`} style={{ marginBottom: '4px' }}>
                                <p>{`item ${index} - ${product.size ?? renderFormatValue(product.size)}`}</p>
                            </div>
                        );
                    });
                }
            },
        },
        {
            key: 'quantity',
            title: `${t('admin_order_quantity_label_table')}`,
            dataIndex: 'quantity',
            render: (_, record) => {
                if (record.products && record.products.length) {
                    return record.products.map((product, index) => {
                        return (
                            <div key={`product-${index}`} style={{ marginBottom: '4px' }}>
                                <p>{`item ${index} - ${product.quantity ?? renderFormatValue(product.quantity)}`}</p>
                            </div>
                        );
                    });
                }
            },
        },
        {
            key: 'discount',
            title: `${t('admin_order_discount_label_table')}`,
            dataIndex: 'discount',
            render: (_, record) => {
                if (record.discount) {
                    return <p>{`${record?.discount ?? renderFormatValue(record.discount)}`}</p>;
                }
            },
        },
        {
            key: 'totalPrice',
            title: `${t('admin_order_total_price_label_table')}`,
            dataIndex: 'totalPrice',
            render: (_, record) => {
                if (record.totalPrice) {
                    return <p>{`${record?.totalPrice ?? renderFormatValue(record.totalPrice)} đ`}</p>;
                }
            },
        },
        {
            key: 'status',
            title: `${t('admin_order_status_label_table')}`,
            dataIndex: 'status',
            render: (_, record) => {
                if (record?.status.toUpperCase() === 'PENDING') {
                    return <Tag color='gold'>{`${t('admin_order_status_pending_label_table')}`}</Tag>;
                } else if (record?.status.toUpperCase() === 'SHIPPED') {
                    return <Tag color='blue'>{`${t('admin_order_status_shipped_label_table')}`}</Tag>;
                } else if (record?.status.toUpperCase() === 'DELIVERED') {
                    return <Tag color='green'>{`${t('admin_order_status_delivered_label_table')}`}</Tag>;
                } else {
                    return <Tag color='red'>{`${t('admin_order_status_canceled_label_table')}`}</Tag>;
                }
            },
        },
        {
            key: 'paymentStatus',
            title: `${t('admin_order_payment_status_label_table')}`,
            dataIndex: 'paymentStatus',
            render: (_, record) => {
                if (record?.paymentStatus.toUpperCase() === 'PAID') {
                    return <Tag color='green'>{`${t('admin_order_payment_status_paid_label_table')}`}</Tag>;
                } else if (record?.paymentStatus.toUpperCase() === 'UNPAID') {
                    return <Tag color='grey'>{`${t('admin_order_payment_status_unpaid_label_table')}`}</Tag>;
                }
            },
        },
        {
            key: 'action',
            title: '',
            dataIndex: 'action',
            render: (_, record) => {
                if (record) {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: `${t('common_detail')}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_detail')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.eyeIcon} />,
                                        onClick: () => handleDetailSupplier(record.sku),
                                    },
                                    {
                                        key: `${t('common_edit')}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_edit')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.editIcon} />,
                                        // onClick: () => handleEditSupplier(record),
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
    const [openDrawerDetail, setOpenDrawerDetail] = useState<boolean>(false);
    const [order, setOrder] = useState<IOrder[]>([]);
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
        dispatch(getOrderThunk(paramsPage))
            .unwrap()
            .then((response) => {
                if (response) {
                    const pagination = response?.pagination;
                    setOrder(response?.data);
                    setCurrentPage((prev) => ({
                        ...prev,
                        lengthPage: pagination.lengthPage,
                        currentPage: pagination.currentPage,
                    }));
                }
            })
            .catch((error) => {
                message.error(error?.message);
            })
            .finally(() => {
                loadingContext?.hide();
                dispatch(supplierActions.setRefreshTableFalse());
            });
    }, [paramsPage.currentPage, isRefreshTable, paramsPage]);
    //#endregion Implement Hook

    //#region Handle Function
    const handleDetailSupplier = (sku: string) => {
        setOpenDrawerDetail(true);
    };

    const handleChangePage = (e: number) => {
        setParamsPage((prev) => ({ ...prev, currentPage: e }));
    };
    //#endregion Handle Function

    return (
        <div id='orderComponent' className={cx('mainOrder')}>
            <div className={cx('headerOrder')}>
                <div className={cx('headerTitle')}>
                    <h1>{t('admin_order_title')}</h1>
                </div>
                <div className={cx('headerButtons')}>
                    <Button size='large' type='primary'>{`${t('common_filters')}`}</Button>
                </div>
            </div>
            <>
                {order.length ? (
                    <div className={cx('bodyOrder')}>
                        <Table
                            rowKey={(record) => record.sku}
                            tableLayout='fixed'
                            columns={columns}
                            dataSource={order}
                            pagination={false}
                            scroll={{ x: 400, y: 590 }}
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
                    <Empty className={cx('bodyEmptyOrder')} />
                )}
            </>
        </div>
    );
};

export default Order;
