// Libs
import classNames from 'classnames/bind';
import { Button, Empty, Image, InputNumber, Table, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// Components, Layouts, Pages
import IconSVG from '~/components/common/icon/IconSVG';
// Others
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { renderFormatValue } from '~/utils/constants/helper';
import { IProducts } from '~/utils/interfaces/interfaceOrder';
import { baseURL } from '~/utils/constants/env';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { orderActions } from '~/thunks/order/orderSlice';
import { RootState } from '~/redux/store';
// Styles, Images, icons
import styles from './Checkout.module.scss';
import { icons } from '~/assets';

type Props = {
    // content?: string;
};

const cx = classNames.bind(styles);

const Checkout = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Checkout Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    //#endregion Declare Hook

    //#region Selector
    const orderStore = useAppSelector((state: RootState) => state.order.order);
    //#endregion Selector

    //#region Declare State
    // const [product, setProduct] = useState<IProducts[]>(
    //     localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')!) : []
    // );
    //#endregion Declare State
    //#region Create Variables
    const columns: Columns<IProducts, DataType<IProducts>>[] = [
        {
            title: t('user_products_code_label_table'),
            dataIndex: 'productId',
            key: 'productId',
            render: (_, record) => {
                if (record?.image && record?.color && record?.size && record?.name) {
                    return (
                        <div className={cx('columnsProduct')}>
                            <Image
                                width={100}
                                height={100}
                                className='object-fill'
                                src={`${baseURL}/${record.image}`}
                                alt={record.name}
                            />
                            <div>
                                <Typography.Title level={5}>{`${
                                    record.name ?? renderFormatValue(record.name)
                                }`}</Typography.Title>
                                <div className={cx('typeProduct')}>
                                    <div className='flex'>
                                        <Typography.Title level={5}>
                                            {t('user_order_type_size_products_label')}
                                        </Typography.Title>
                                        <p>{`${record.size ?? renderFormatValue(record.size)}`}</p>
                                    </div>
                                    <div className='flex items-center content-center gap-2 w-full'>
                                        <Typography.Title level={5}>
                                            {t('user_order_type_color_products_label')}
                                        </Typography.Title>
                                        <Tag color={`${record.color}`} className={cx(`h-[20px]`)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            },
        },
        {
            title: t('user_products_price_label_table'),
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => {
                if (record?.price) {
                    return <p>{`${record.price ?? renderFormatValue(record.price)}`}</p>;
                }
            },
        },
        {
            title: t('user_products_quantity_label_table'),
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => {
                if (record?.quantity) {
                    return (
                        <InputNumber
                            size='large'
                            min={1}
                            defaultValue={record?.quantity}
                            onChange={(value) => handleQuantityChange(value as number, record)}
                            changeOnWheel
                        />
                    );
                }
            },
        },
        {
            title: t('user_products_subtotal_label_table'),
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => {
                if (record?.price && record?.quantity) {
                    const total = record.price * record.quantity;
                    return <p>{`${total ?? renderFormatValue(total)}`}</p>;
                }
            },
        },
        {
            title: '',
            dataIndex: 'productId',
            key: 'productId',
            render: (_, record) => {
                if (record?.productId) {
                    return (
                        <IconSVG
                            className='cursor-pointer'
                            onClick={() => handleDelete(record)}
                            colorIcon='red'
                            IconComponent={icons.deleteIcon}
                        />
                    );
                }
            },
            align: 'center',
        },
    ];
    //#endregion Create Variables

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleQuantityChange = (value: number | null, record: IProducts) => {
        if (value && value > 0) {
            dispatch(
                orderActions.updateQuantity({
                    id: record.productId as string,
                    quantity: value,
                    color: record.color,
                    size: record.size,
                })
            );
        }
    };

    const handleDelete = (record: IProducts) => {
        dispatch(
            orderActions.removeProduct({
                id: record.productId as string,
                color: record.color,
                size: record.size,
            })
        );
    };
    //#endregion Handle Function

    return (
        <div id='checkoutComponent' className={cx('mainCheckout')}>
            <Typography.Title level={2}>{t('user_order_checkout_tile')}</Typography.Title>
            <div className={cx('tableOrderProduct')}>
                {orderStore.products && orderStore.products.length > 0 ? (
                    <Table
                        rowKey={(record) => `${record.productId}_${Math.random().toString(36).substr(2, 5)}`}
                        tableLayout='auto'
                        bordered={false}
                        pagination={false}
                        className='w-full'
                        columns={columns}
                        dataSource={orderStore.products}
                    />
                ) : (
                    <Empty
                        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                        className={cx('emptyOrder')}
                        description={
                            <Typography.Text>
                                <span>{t('user_description_empty')}</span>
                                <Link to='/products'>
                                    <Button size='large' type='text'>
                                        {t('user_name_button_empty')}
                                    </Button>
                                </Link>
                            </Typography.Text>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Checkout;
