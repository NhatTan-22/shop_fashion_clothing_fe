// Libs
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { BaseButton, BaseTable, IconSVG } from '~/components';
// Others
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { IOrder } from '~/utils/interfaces/interfaceOrder';
import { renderFormatValue } from '~/utils/constants/helper';
import { baseURL } from '~/utils/constants/env';
// Styles, Images, icons
import styles from './OrderPage.module.scss';
import { icons } from '~/assets';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { Empty, Input, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

// const contactBreadcrumbs = [
//     {
//         to: '/orders',
//         title: 'Your cart',
//     },
// ];

const OrderPage = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    const columns: Columns<IOrder, DataType<IOrder>>[] = [
        // {
        //     title: t('user_products_code_label_table'),
        //     dataIndex: 'productDetails',
        //     key: 'productDetails',
        //     render: (_, record) => {
        //         if (record?.img && record?.name && record?.size && record?.color) {
        //             return (
        //                 <div className={cx('columnsProduct')}>
        //                     <img src={`${record.img ?? `${baseURL}/${record.img}`}`} alt='' />
        //                     <div>
        //                         <div className={cx('nameProduct')}>{`${
        //                             record.name ?? renderFormatValue(record.name)
        //                         }`}</div>
        //                         <div className={cx('typeProduct')}>
        //                             <div className='flex'>
        //                                 {t('user_order_type_size_products_label')}
        //                                 <p>{`${record.size ?? renderFormatValue(record.size)}`}</p>
        //                             </div>
        //                             <div className='flex'>
        //                                 {t('user_order_type_color_products_label')}
        //                                 <p>{`${record.color ?? renderFormatValue(record.color)}`}</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             );
        //         }
        //     },
        // },
        {
            title: t('user_products_price_label_table'),
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('user_products_quantity_label_table'),
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, _) => {
                return (
                    <div className={cx('buttonCount')}>
                        <IconSVG IconComponent={icons.arrowLeftIcon} />
                        <p>{`${text ?? renderFormatValue(text)}`}</p>
                        <IconSVG IconComponent={icons.arrowRightIcon} />
                    </div>
                );
            },
        },
        // {
        //     title: t('user_products_subtotal_label_table'),
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (_, record) => {
        //         if (record?.sellingPrice && record?.quantity) {
        //             const total = record.sellingPrice * record.quantity;
        //             return <p>{`${total ?? renderFormatValue(total)}`}</p>;
        //         }
        //     },
        // },
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: (text, _) => {
                if (!text._id) {
                    return (
                        <IconSVG
                            onClick={() => handleDelete(text._id)}
                            colorIcon='red'
                            IconComponent={icons.deleteIcon}
                        />
                    );
                }
            },
        },
    ];
    //#endregion Selector

    //#region Declare State
    const [order, setOrder] = useState([]);
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleDelete = (id: string | any) => {};
    //#endregion Handle Function

    return (
        <div id='orderPageComponent' className={cx('mainOrderPage')}>
            <div className={cx('headerOrder')}>
                <h1>{t('user_order_checkout_tile')}</h1>
            </div>
            <div className={cx('contentOrder')}>
                <div className={cx('tableOrderProduct')}>
                    {order.length ? (
                        <BaseTable columns={columns} dataSource={order} />
                    ) : (
                        <Empty
                            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                            className={cx('emptyOrder')}
                            description={
                                <Typography.Text>
                                    <span>{t('user_description_empty')}</span>{' '}
                                    <Link to='/products'>
                                        <BaseButton
                                            styleButton={ButtonStyleEnum.TEXT}
                                            nameButton={t('user_name_button_empty')}
                                        />
                                    </Link>
                                </Typography.Text>
                            }
                        />
                    )}
                </div>
                <div className={cx('colTotalBill')}>
                    <div className={cx('labelItem')}>
                        <span>{t('user_products_subtotal_label')}</span>
                    </div>
                    <div className={cx('contentTotalBill')}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input placeholder={t('user_products_enter_discount_code_label')} />
                            <BaseButton styleButton={ButtonStyleEnum.PRIMARY} nameButton={t('common_apply')} />
                        </Space.Compact>
                        <div className={cx('labelItem')}>
                            <span>{t('user_products_delivery_charge_label')}</span>
                            <span>$5.00</span>
                        </div>
                    </div>
                    <div className={cx('rowTotalBill')}>
                        <div className={cx('labelItem')}>
                            <span>{t('user_products_grand_total_label')}</span>
                        </div>
                        <BaseButton
                            styleButton={ButtonStyleEnum.PRIMARY}
                            nameButton={t('user_products_proceed_to_checkout_label_button')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
