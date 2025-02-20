// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Empty, MenuProps, message, Modal, Pagination } from 'antd';
// Components, Layouts, Pages
import { BaseButton, BaseTable, DetailSupplier, IconSVG } from '~/components';
import FormAddSupplier from '~/form/formSupplier/FormAddSupplier';
// Others
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { supplierActions } from '~/thunks/supplier/supplierSlice';
import { LoadingContext } from '~/context';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { deleteSupplierThunk, getSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { convertTypeSupplier, renderFormatValue } from '~/utils/constants/helper';
// Styles, Images, icons
import styles from './Supplier.module.scss';
import { icons } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Supplier = (props: Props) => {
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

    const columns: Columns<ISupplier, DataType<ISupplier>>[] = [
        {
            key: 'sku',
            title: `${t('admin_supplier_code_label_table')}`,
            dataIndex: 'sku',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'name',
            title: `${t('admin_supplier_name_label_table')}`,
            dataIndex: 'name',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
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
            title: `${t('admin_products_code_label_table')}`,
            dataIndex: 'categories',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'restockStatus',
            title: `${t('admin_supplier_type_label_table')}`,
            dataIndex: 'restockStatus',
            render: (_, record) => {
                if (record) {
                    return <p>{record?.restockStatus}</p>;
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
                                        key: `${t('common_edit')}`,
                                        label: <p style={{ marginLeft: '2px' }}>Edit</p>,
                                        icon: <IconSVG IconComponent={icons.editIcon} />,
                                        onClick: () => handleEditSupplier(record),
                                    },
                                    {
                                        key: `${t('common_delete')}`,
                                        label: <p style={{ marginLeft: '2px' }}>Delete</p>,
                                        icon: <IconSVG IconComponent={icons.deleteIcon} />,
                                        onClick: () => handleDeleteSupplier(record),
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
    const [openModalAddSupplier, setOpenModalAddSupplier] = useState<boolean>(false);
    const [data, setData] = useState<ISupplier[]>([]);
    const [supplier, setSupplier] = useState<ISupplier>();
    const [currentPage, setCurrentPage] = useState<IPagination>({
        lengthPage: 0,
        currentPage: 1,
    });
    const [paramsPage, setParamsPage] = useState<IParamsPagination>({
        currentPage: 1,
        limitPage: 10,
    });
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        loadingContext?.show();
        dispatch(getSupplierThunk(paramsPage))
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
                console.log(error?.message);
                message.error(error?.message);
            })
            .finally(() => {
                loadingContext?.hide();
                dispatch(supplierActions.setRefreshTableFalse());
            });
    }, [paramsPage.currentPage, isRefreshTable]);
    //#endregion Implement Hook

    //#region Handle Function
    const handleEditSupplier = (data: DataType<ISupplier>) => {
        setSupplier(data);
        setOpenDrawerDetail(true);
    };

    const handleDeleteSupplier = (data: DataType<ISupplier>) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            // icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xóa Supplier này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                loadingContext?.show();
                dispatch(deleteSupplierThunk(data._id))
                    .unwrap()
                    .then((response) => {
                        if (response) {
                            setOpenDrawerDetail(false);
                            message.success(response.message);
                            dispatch(supplierActions.setRefreshTableTrue());
                        }
                    })
                    .catch((error) => {
                        message.error(error.message);
                    })
                    .finally(() => {
                        loadingContext?.hide();
                    });
            },
        });
    };

    const handleIsOpenAddSupplier = () => {
        setOpenModalAddSupplier(!openModalAddSupplier);
    };

    const handleChangePage = (e: number) => {
        setParamsPage({ ...paramsPage, currentPage: e });
    };
    //#endregion Handle Function

    return (
        <div id='supplierComponent' className={cx('mainSupplier')}>
            <div className={cx('headerSupplier')}>
                <div className={cx('headerTitle')}>
                    <h1>{t('admin_suppliers_header')}</h1>
                </div>
                <div className={cx('headerButtons')}>
                    <BaseButton
                        nameButton={t('common_add_supplier')}
                        title={t('common_add_supplier')}
                        styleButton={ButtonStyleEnum.PRIMARY}
                        onClick={handleIsOpenAddSupplier}
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
                    <div className={cx('bodySupplier')}>
                        <BaseTable columns={columns} dataSource={data} />
                        <Pagination
                            className={cx('footerPagination')}
                            align='center'
                            defaultCurrent={currentPage?.currentPage}
                            total={currentPage.lengthPage}
                            showSizeChanger={false}
                            onChange={handleChangePage}
                        />
                    </div>
                ) : (
                    <Empty className={cx('bodyEmptySupplier')} />
                )}
            </>
            <>
                {supplier && (
                    <DetailSupplier
                        openDrawerDetail={openDrawerDetail}
                        setOpenDrawerDetail={setOpenDrawerDetail}
                        dataSupplier={supplier}
                    />
                )}
            </>

            <FormAddSupplier isShowModal={openModalAddSupplier} onClose={handleIsOpenAddSupplier} />
        </div>
    );
};

export default Supplier;
