// Libs
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { BaseButton, BaseTable } from '~/components';
// Others
import { IInventory } from '~/utils/interfaces/interfaceInventory';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { ButtonStyleEnum } from '~/utils/constants/enum';
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
    const [data, setData] = useState<IInventory[]>([]);
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function

    const columns: Columns<IInventory, DataType<IInventory>>[] = [
        {
            title: t('Products'),
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: t('Buying Price'),
            dataIndex: 'buying_price',
            key: 'buying_price',
        },
        {
            title: t('Quantity'),
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: t('Threshold Value'),
            dataIndex: ' threshold_value',
            key: ' threshold_value',
        },
        {
            title: t('Expiry Date'),
            dataIndex: ' expiry_date',
            key: ' expiry_date',
        },
        {
            title: t('Availability'),
            dataIndex: ' availability',
            key: ' availability',
        },
    ];
    //#endregion Handle Function

    return (
        <div id='inventoryComponent' className={cx('mainInventory')}>
            <div className={cx('contentInventory')}>
                <div className={cx('headerTitle')}>
                    <h1>{t('admin_overall_inventory_header')}</h1>
                </div>
                <div>{/* Components Header Content */}</div>
            </div>
            <div className={cx('bodyInventory')}>
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
                <BaseTable columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Inventory;
