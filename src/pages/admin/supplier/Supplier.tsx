// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Empty, message, Pagination } from 'antd';
// Components, Layouts, Pages
import { useAppDispatch } from '~/redux/hooks';
import { BaseButton, BaseTable, DetailSupplier } from '~/components';
import FormAddSupplier from '~/form/formSupplier/FormAddSupplier';
// Others
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { LoadingContext } from '~/context';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { getSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { convertTypeSupplier, renderFormatValue } from '~/utils/constants/helper';
// Styles, Images, icons
import styles from './Supplier.module.scss';

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
    const columns: Columns<ISupplier, DataType<ISupplier>>[] = [
        {
            key: 'supplierCode',
            title: `${t('admin_supplier_code_label_table')}`,
            dataIndex: 'supplierCode',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'supplierName',
            title: `${t('admin_supplier_name_label_table')}`,
            dataIndex: 'supplierName',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },

        {
            key: 'supplierPhone',
            title: `${t('admin_supplier_phone_label_table')}`,
            dataIndex: 'supplierPhone',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'productCode',
            title: `${t('admin_products_code_label_table')}`,
            dataIndex: 'productCode',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            key: 'isTaking',
            title: `${t('admin_supplier_type_label_table')}`,
            dataIndex: 'isTaking',
            render: (_, record) => {
                return record?.isTaking?.map((type, index) => {
                    const typeData = convertTypeSupplier(type);
                    return (
                        <p key={index} className={cx(typeData?.className)}>
                            {typeData?.text}
                        </p>
                    );
                });
            },
        },
        {
            key: 'quantityImported',
            title: `${t('admin_supplier_quantity_imported_label_table')}`,
            dataIndex: 'quantityImported',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
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
                console.log('error: ', error);
                message.error(error?.message);
            })
            .finally(() => {
                loadingContext?.hide();
            });
    }, [paramsPage.currentPage, data.length]);
    //#endregion Implement Hook

    //#region Handle Function
    const handleRowClick = (row: DataType<ISupplier>) => {
        setSupplier(row);
        setOpenDrawerDetail(true);
    };

    const handleAddSupplier = () => {
        setOpenModalAddSupplier(true);
    };

    const handleCloseAddSupplier = () => {
        setOpenModalAddSupplier(false);
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
                        onClick={handleAddSupplier}
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
                        <BaseTable columns={columns} dataSource={data} onClick={handleRowClick} />
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

            <FormAddSupplier isShowModal={openModalAddSupplier} onCancel={handleCloseAddSupplier} />
        </div>
    );
};

export default Supplier;
