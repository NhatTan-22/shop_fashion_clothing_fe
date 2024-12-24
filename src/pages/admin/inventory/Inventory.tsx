// Libs
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty, Pagination } from 'antd';
// Components, Layouts, Pages
import { BaseButton, BaseTable } from '~/components';
// Others
import { IInventory } from '~/utils/interfaces/interfaceInventory';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { mockDataInventory } from '~/utils/constants/mockData';
import { renderFormatValue } from '~/utils/constants/helper';
// Styles, Images, icons
import styles from './Inventory.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Inventory = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Inventory Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [data, setData] = useState<IInventory[]>(mockDataInventory);
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function

    const columns: Columns<IInventory, DataType<IInventory>>[] = [
        {
            title: t('Products'),
            dataIndex: 'product_name',
            key: 'product_name',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('Buying Price'),
            dataIndex: 'buying_price',
            key: 'buying_price',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('Quantity'),
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('Threshold Value'),
            dataIndex: ' thresholdValue',
            key: ' thresholdValue',
            render: (_, record) => {
                if (record?.thresholdValue) {
                    return <p>{`${renderFormatValue(record.thresholdValue)}`}</p>;
                }
            },
        },
        {
            title: t('Expiry Date'),
            dataIndex: ' expiryDate',
            key: ' expiryDate',
            render: (_, record) => {
                if (record?.expiryDate) {
                    return <p>{`${renderFormatValue(record.expiryDate)}`}</p>;
                }
            },
        },
        {
            title: t('Availability'),
            dataIndex: ' availability',
            key: ' availability',
            render: (_, record) => {
                if (record?.availability) {
                    return <p>{`${renderFormatValue(record.availability)}`}</p>;
                }
            },
        },
    ];

    const handleRowClick = (row: DataType<IInventory>) => {
        console.log('Clicked row data:', row);
    };
    //#endregion Handle Function

    return (
        <div id='inventoryComponent' className={cx('mainInventory')}>
            <div className={cx('contentInventory')}>
                <div className={cx('headerTitle')}>
                    <h1>{t('admin_overall_inventory_header')}</h1>
                </div>
                <div>{/* Components Header Content */}</div>
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
                                <Pagination align='center' defaultCurrent={1} total={100} showSizeChanger={false} />
                            </div>
                        </div>
                    ) : (
                        <Empty className={cx('bodyEmptySupplier')} />
                    )}
                </>
            </div>
        </div>
    );
};

export default Inventory;
