// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
// Components, Layouts, Pages
import { BaseButton, BaseTable } from '~/components';
// Others
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { ButtonStyleEnum } from '~/utils/constants/enum';
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
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [data, setData] = useState<ISupplier[]>([]);
    //#endregion Declare State

    //#region Implement Hook
    const columns: Columns<ISupplier, DataType<ISupplier>>[] = [
        {
            key: 'supplier_name',
            title: 'Supplier Name',
            dataIndex: 'supplier_name',
            render: (text, _) => {
                return <p>{text.supplier_name}</p>;
            },
        },
        {
            key: 'product',
            title: 'Product',
            dataIndex: 'product',
            render: (text, _) => {
                return <p>{text.product}</p>;
            },
        },
        {
            key: 'contact_number',
            title: 'Contact Number',
            dataIndex: 'contact_number',
            render: (text, _) => {
                return <p>{text.contact_number}</p>;
            },
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            render: (text, _) => {
                return <p>{text.email}</p>;
            },
        },
        {
            key: 'type',
            title: 'Type',
            dataIndex: 'type',
            render: (_, record) => {
                return record.type?.map((type) => {
                    if (type === 'Taking Return') {
                        return <p>{type}</p>;
                    } else {
                        return <p>{type}</p>;
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
    //#endregion Implement Hook

    //#region Handle Function
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
                    <BaseButton nameButton={t('common_filters')} title={t('common_filters')} styleButton={ButtonStyleEnum.PRIMARY} />
                </div>
            </div>
            <BaseTable columns={columns} dataSource={data} />
        </div>
    );
};

export default Supplier;
