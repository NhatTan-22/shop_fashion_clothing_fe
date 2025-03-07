// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Button, Input, Space, Typography } from 'antd';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './OrderPage.module.scss';
import { useEffect, useState } from 'react';

type Props = {
    // content?: string;
};

const cx = classNames.bind(styles);

const OrderPage = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const location = useLocation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [currentStep, setCurrentStep] = useState<number>(0);
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        setCurrentStep(0);
    }, [location.pathname]);
    //#endregion Implement Hook

    //#region Handle Function
    function handlePlaceOrder() {
        // Handle Place Order
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
                        <Typography.Title level={4}>{t('user_products_subtotal_label')}</Typography.Title>
                        <Typography.Title level={4} className='!m-0'>
                            {
                                // Tiền giá gốc
                            }
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
                            <Typography.Title level={4} className='!m-0'>
                                {t('user_products_delivery_charge_label')}
                            </Typography.Title>
                            <Typography.Title level={4} className='!m-0'>
                                {
                                    // Phí giao hàng
                                }
                            </Typography.Title>
                        </div>
                    </div>
                    <div className={cx('rowTotalBill')}>
                        <div className={cx('labelItem')}>
                            <Typography.Title level={4} className='!m-0'>
                                {t('user_products_grand_total_label')}
                            </Typography.Title>
                            <Typography.Title level={4} className='!m-0'>
                                {
                                    // Tiền trừ giảm giá
                                }
                            </Typography.Title>
                        </div>
                        {location.pathname === '/products/cart' ? (
                            <Link to='/products/cart/shipping-address'>
                                <Button size='large' type='primary' className='w-full'>
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
        </div>
    );
};

export default OrderPage;
