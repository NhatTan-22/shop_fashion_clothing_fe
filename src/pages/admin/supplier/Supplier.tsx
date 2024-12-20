// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Empty, message, Pagination } from 'antd';
// Components, Layouts, Pages
import { useAppDispatch } from '~/redux/hooks';
import { BaseButton, BaseTable } from '~/components';
// Others
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { LoadingContext } from '~/context';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { mockDataSupplier } from '~/utils/constants/mockData';
import { supplierThunk } from '~/thunks/supplier/supplierThunk';
// Styles, Images, icons
import styles from './Supplier.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Supplier = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Supplier Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    const columns: Columns<ISupplier, DataType<ISupplier>>[] = [
        {
            key: 'supplierName',
            title: 'Supplier Name',
            dataIndex: 'supplierName',
            render: (text, _) => {
                return <p>{`${text}`}</p>;
            },
        },
        {
            key: 'supplierProduct',
            title: 'Code Product',
            dataIndex: 'supplierProduct',
            render: (text, _) => {
                return <p>{`${text}`}</p>;
            },
        },
        {
            key: 'supplierPhone',
            title: 'Contact Number',
            dataIndex: 'supplierPhone',
            render: (text, _) => {
                return <p>{`${text}`}</p>;
            },
        },
        {
            key: 'supplierEmail',
            title: 'Email',
            dataIndex: 'supplierEmail',
            render: (text, _) => {
                return <p>{`${text}`}</p>;
            },
        },
        {
            key: 'isTaking',
            title: 'Type',
            dataIndex: 'isTaking',
            render: (_, record) => {
                return record?.isTaking?.map((type, index) => {
                    if (type === 'Taking Return') {
                        return <p key={index}>{type}</p>;
                    } else {
                        return <p key={index}>{type}</p>;
                    }
                });
            },
        },
        {
            key: 'on_the_way',
            title: 'On The Way',
            dataIndex: 'on_the_way',
        },
    ];
    //#endregion Selector

    //#region Declare State
    const [data, setData] = useState<ISupplier[]>([]);
    const [currentPage, setCurrentPage] = useState<IPagination>({
        lengthPage: 1,
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
        dispatch(supplierThunk(paramsPage))
            .unwrap()
            .then((response) => {
                const suppliers = response?.data;
                const pagination = suppliers?.pagination;
                setCurrentPage({
                    lengthPage: pagination.lengthPage,
                    currentPage: pagination.currentPage,
                });
                setData(suppliers.data);
            })
            .catch((error) => {
                message.error(error?.data);
            })
            .finally(() => {
                loadingContext?.hide();
            });
    }, [paramsPage.currentPage]);
    //#endregion Implement Hook

    //#region Handle Function
    const handleRowClick = (row: DataType<ISupplier>) => {
        console.log('Clicked row data:', row);
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
                        nameButton={t('common_add_product')}
                        title={t('common_add_product')}
                        styleButton={ButtonStyleEnum.PRIMARY}
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
                        {/* <div className={cx('footerPagination')}> */}
                        <Pagination
                            className={cx('footerPagination')}
                            align='center'
                            defaultCurrent={currentPage?.currentPage}
                            total={currentPage.lengthPage}
                            showSizeChanger={false}
                            onChange={handleChangePage}
                        />
                        {/* </div> */}
                    </div>
                ) : (
                    <Empty className={cx('bodyEmptySupplier')} />
                )}
            </>
        </div>
    );
};

export default Supplier;
