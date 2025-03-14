// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Empty, message, Modal, Pagination, Table, Tag } from 'antd';
// Components, Layouts, Pages
import { DetailSupplier, IconSVG } from '~/components';
import FormAddSupplier from '~/form/formSupplier/FormAddSupplier';
// Others
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { supplierActions } from '~/thunks/supplier/supplierSlice';
import { LoadingContext } from '~/context';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { deleteSupplierThunk, getSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { renderFormatDate, renderFormatValue } from '~/utils/constants/helper';
import { ICategory } from '~/utils/interfaces/interfaceCategory';
import { baseURL } from '~/utils/constants/env';
// Styles, Images, icons
import styles from './Supplier.module.scss';
import { icons } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Supplier = (props: Props) => {
   
    // const { content = 'Supplier Component' } = props;
    

    
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    

    
    const isRefreshTable = useAppSelector((state) => state.supplier.isRefreshSupplier);

    const columns: Columns<ISupplier, DataType<ISupplier>>[] = [
        {
            key: 'sku',
            title: `${t('admin_supplier_sku_label_table')}`,
            dataIndex: 'sku',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'image',
            title: `${t('admin_supplier_image_label_table')}`,
            dataIndex: 'image',
            render: (_, record) => {
                if (record) {
                    return <Avatar src={`${baseURL}/${record.image}`} alt={record.supplierName} />;
                }
            },
        },
        {
            key: 'supplierName',
            title: `${t('admin_supplier_name_label_table')}`,
            dataIndex: 'supplierName',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
            align: 'left',
        },
        {
            key: 'contactPerson',
            title: `${t('admin_supplier_contact_person_label_table')}`,
            dataIndex: 'contactPerson',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
            align: 'left',
        },
        {
            key: 'phone',
            title: `${t('admin_supplier_phone_label_table')}`,
            dataIndex: 'phone',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'categories',
            title: `${t('admin_supplier_categories_provided_label_table')}`,
            dataIndex: 'categories',
            render: (_, record) => {
                if (record.categories.length) {
                    return <p>{record.categories.map((category) => (category as ICategory).name).join(', ')}</p>;
                } else {
                    return <p>{`${renderFormatValue('')}`}</p>;
                }
            },
        },
        {
            key: 'orderQuantity',
            title: `${t('admin_supplier_quantity_imported_label_table')}`,
            dataIndex: 'orderQuantity',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'importPrice',
            title: `${t('admin_supplier_imported_price_label_table')}`,
            dataIndex: 'importPrice',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'restockStatus',
            title: `${t('admin_supplier_type_label_table')}`,
            dataIndex: 'restockStatus',
            render: (_, record) => {
                if (record?.restockStatus.toUpperCase() === 'PENDING') {
                    return <Tag color='gold'>{`${t('admin_supplier_type_pending_label_table')}`}</Tag>;
                } else if (record?.restockStatus.toUpperCase() === 'SHIPPED') {
                    return <Tag color='blue'>{`${t('admin_supplier_type_shipped_label_table')}`}</Tag>;
                } else {
                    return <Tag color='green'>{`${t('admin_supplier_type_received_label_table')}`}</Tag>;
                }
            },
        },
        {
            key: 'lastRestockDate',
            title: `${t('admin_supplier_last_restock_date_label_table')}`,
            dataIndex: 'lastRestockDate',
            render: (_, record) => {
                if (record.lastRestockDate) {
                    return <p>{`${renderFormatDate(record.lastRestockDate)}`}</p>;
                }
            },
        },
        {
            key: '_id',
            title: '',
            dataIndex: '_id',
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
                                        onClick: () => handleDetailSupplier(record.slug),
                                    },
                                    {
                                        key: `${t('common_edit')}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_edit')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.editIcon} />,
                                        // onClick: () => handleEditSupplier(record),
                                    },
                                    {
                                        key: `${t('common_delete')}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_delete')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.deleteIcon} />,
                                        onClick: () => handleDeleteSupplier(record._id),
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

    

    
    const [openDrawerDetail, setOpenDrawerDetail] = useState<boolean>(false);
    const [openModalAddSupplier, setOpenModalAddSupplier] = useState<boolean>(false);
    const [supplier, setSupplier] = useState<ISupplier[]>([]);
    const [slug, setSlug] = useState<string>('');
    const [paramsPage, setParamsPage] = useState<IParamsPagination>({
        currentPage: 1,
        limitPage: 10,
    });
    const [currentPage, setCurrentPage] = useState<IPagination>({
        lengthPage: 0,
        currentPage: 1,
    });
    

    
    useEffect(() => {
        try {
            loadingContext?.show();
            dispatch(getSupplierThunk(paramsPage))
                .unwrap()
                .then((response) => {
                    if (response) {
                        const pagination = response?.pagination;
                        setSupplier(response?.data);
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
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error(String(error));
            }
        }
    }, [paramsPage.currentPage, isRefreshTable, paramsPage]);
   

    //#region Handle Function
    const handleDetailSupplier = (slug: string) => {
        setSlug(slug);
        setOpenDrawerDetail(true);
    };

    const handleDeleteSupplier = (_id: string) => {
        console.log(_id);
        try {
            Modal.confirm({
                title: `${t('common_confirm_title')}`,
                icon: <IconSVG IconComponent={icons.deleteIcon} colorIcon='red' />,
                content: `${t('common_confirm_content')}`,
                okText: `${t('common_delete')}`,
                okType: 'danger',
                cancelText: `${t('common_cancel')}`,
                onOk: () => {
                    loadingContext?.show();
                    dispatch(deleteSupplierThunk(_id))
                        .unwrap()
                        .then((response) => {
                            if (response) {
                                setOpenDrawerDetail(false);
                                message.success(response.message);
                                dispatch(supplierActions.setRefreshTableTrue());
                            }
                        })
                        .catch((error) => {
                            console.log(error.message);
                            message.error(error.message);
                        })
                        .finally(() => {
                            loadingContext?.hide();
                        });
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error(String(error));
            }
        }
    };

    const handleIsOpenAddSupplier = () => {
        setOpenModalAddSupplier(!openModalAddSupplier);
    };

    const handleChangePage = (e: number) => {
        setParamsPage((prev) => ({ ...prev, currentPage: e }));
    };
    //#endregion Handle Function

    return (
        <div id='supplierComponent' className={cx('mainSupplier')}>
            <div className={cx('headerSupplier')}>
                <div className={cx('headerTitle')}>
                    <h1>{t('admin_suppliers_header')}</h1>
                </div>
                <div className={cx('headerButtons')}>
                    <Button size='large' type='primary' onClick={handleIsOpenAddSupplier}>
                        {`${t('common_add_supplier')}`}
                    </Button>
                    <Button size='large' type='primary'>{`${t('common_filters')}`}</Button>
                </div>
            </div>
            <>
                {supplier.length ? (
                    <div className={cx('bodySupplier')}>
                        <Table
                            rowKey={(record) => record.supplierName}
                            tableLayout='fixed'
                            columns={columns}
                            dataSource={supplier}
                            pagination={false}
                            scroll={{ x: 400, y: 550 }}
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
            <>
                <DetailSupplier
                    openDrawerDetail={openDrawerDetail}
                    setOpenDrawerDetail={setOpenDrawerDetail}
                    slug={slug}
                />
            </>

            <FormAddSupplier isShowModal={openModalAddSupplier} onClose={handleIsOpenAddSupplier} />
        </div>
    );
};

export default Supplier;
