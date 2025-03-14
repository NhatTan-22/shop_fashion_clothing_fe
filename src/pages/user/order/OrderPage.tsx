// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Button, Input, message, Modal, Result, Space, Typography } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// Components, Layouts, Pages
// Others
import { RootState } from '~/redux/store';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { addOrderThunk } from '~/thunks/order/orderThunk';
import { LoadingContext } from '~/context';
// Styles, Images, icons
import styles from './OrderPage.module.scss';
import { orderActions } from '~/thunks/order/orderSlice';
import { IAddOrder } from '~/utils/interfaces/interfaceOrder';

type Props = {
    // content?: string;
};

const cx = classNames.bind(styles);

const OrderPage = (props: Props) => {
    // const { content = 'Example Component' } = props;

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : '[]';
    const { t } = useTranslation();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);

    //#region Selectors

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isNotification, setIsNotification] = useState<boolean>(false);
    const orderStore = useAppSelector((state: RootState) => state.order.order);
    const [order, setOrder] = useState<IAddOrder>({
        userId: user._id,
        address: {
            nameCustomer: '',
            phone: '',
            address: '',
        },
        products: [],
        totalPrice: 0,
        paymentMethod: '',
        discount: '',
    });

    useEffect(() => {
        setCurrentStep(0);
        if (orderStore) {
            const newOrder: IAddOrder = {
                ...orderStore,
                userId: user._id,
                products: orderStore.products.map(({ image, ...rest }) => rest),
            };
            setOrder(newOrder);
        }
    }, [location.pathname]);

    //#region Handle Function
    function handlePlaceOrder() {
        try {
            loadingContext?.show();
            dispatch(addOrderThunk(order))
                .unwrap()
                .then((response) => {
                    message.success(response.message);
                    localStorage.removeItem('order');
                    setIsNotification(true);
                    dispatch(orderActions.setRefreshTableTrue());
                })
                .catch((error) => {
                    message.error(error.message);
                })
                .finally(() => {
                    loadingContext?.hide();
                });
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error(String(error));
            }
        }
        setIsNotification(true);
    }
    //#endregion Handle Function

    return (
        <div id='orderPageComponent' className={cx('mainOrderPage')}>
            <div className={cx('contentOrder')}>
                <div className='w-full'>
                    <Outlet context={{ currentStep, setCurrentStep }} />
                </div>
                <div className={cx('colTotalBill')}>
                    <div className={cx('labelItem')}>
                        <Typography.Title level={5}>{t('user_products_subtotal_label')}</Typography.Title>
                        <Typography.Title level={5} className='!m-0'>
                            {orderStore.totalPrice}
                        </Typography.Title>
                    </div>
                    <div className={cx('contentTotalBill')}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input placeholder={t('user_products_enter_discount_code_label')} />
                            <Button size='large' type='primary'>
                                {t('common_apply')}
                            </Button>
                        </Space.Compact>
                        <div className={cx('labelItem')}>
                            <Typography.Title level={5} className='!m-0'>
                                {t('user_products_delivery_charge_label')}
                            </Typography.Title>
                            <Typography.Title level={5} className='!m-0'>
                                {
                                    // Phí giao hàng
                                }
                            </Typography.Title>
                        </div>
                    </div>
                    <div className={cx('rowTotalBill')}>
                        <div className={cx('labelItem')}>
                            <Typography.Title level={5} className='!m-0'>
                                {t('user_products_grand_total_label')}
                            </Typography.Title>
                            <Typography.Title level={5} className='!m-0'>
                                {orderStore.totalPrice}
                            </Typography.Title>
                        </div>
                        {location.pathname === '/products/cart' ? (
                            <Link to='/products/cart/shipping-address'>
                                <Button
                                    disabled={!orderStore.products.length}
                                    size='large'
                                    type='primary'
                                    className='w-full'
                                >
                                    {t('user_products_proceed_to_checkout_label_button')}
                                </Button>
                            </Link>
                        ) : (
                            currentStep === 3 && (
                                <Button size='large' type='primary' className='w-full' onClick={handlePlaceOrder}>
                                    {t('user_products_place_order_label_button')}
                                </Button>
                            )
                        )}
                    </div>
                </div>
            </div>

            {isNotification && (
                <Modal open={isNotification} closeIcon={false} footer={null}>
                    <Result
                        status='success'
                        title='Your order is confirmed'
                        subTitle='Thanks for shopping! Your order hasn’t shipped yet, but we will send you an email when it is done.'
                        extra={[
                            <div key={'button'} className='w-full flex flex-col'>
                                <Link to='/my-orders'>
                                    <Button
                                        style={{ width: '100%' }}
                                        type='primary'
                                        size='large'
                                        key='console'
                                        onClick={() => localStorage.removeItem('order')}
                                    >
                                        View Order
                                    </Button>
                                </Link>
                                ,
                                <Link to='/products'>
                                    <Button
                                        style={{ width: '100%' }}
                                        size='large'
                                        key='home'
                                        onClick={() => localStorage.removeItem('order')}
                                    >
                                        Back to Product
                                    </Button>
                                    ,
                                </Link>
                                ,
                            </div>,
                        ]}
                    />
                </Modal>
            )}
        </div>
    );
};

export default OrderPage;
