// Libs
import classNames from 'classnames/bind';
import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    Form,
    Image,
    Input,
    Modal,
    QRCode,
    Radio,
    Row,
    Space,
    Steps,
    Tag,
    Typography,
} from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { RadioChangeEvent } from 'antd';
// Components, Layouts, Pages
import { IconSVG } from '~/components';
// Others
import { RootState } from '~/redux/store';
import { orderActions } from '~/thunks/order/orderSlice';
import { IAddress } from '~/utils/interfaces/interfaceOrder';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { baseURL } from '~/utils/constants/env';
import { renderFormatValue } from '~/utils/constants/helper';
// Styles, Images, icons
import styles from './ShippingAddress.module.scss';
import { icons } from '~/assets';

type Props = {
    // content?: string;
};
const { Step } = Steps;

const cx = classNames.bind(styles);

const ShippingAddress = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'ShippingAddress Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const extraDays = Math.floor(Math.random() * 2) + 3;
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + extraDays);
    const dispatch = useAppDispatch();
    //#endregion Declare Hook

    //#region Selector
    const orderStore = useAppSelector((state: RootState) => state.order.order);
    const { setCurrentStep } = useOutletContext<{
        setCurrentStep: (step: number) => void;
    }>();

    //#endregion Selector

    //#region Declare State
    const [step, setStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingAddress, setShippingAddress] = useState<IAddress>({
        nameCustomer: '',
        phone: '',
        address: '',
    });
    const [isOpenAddAddress, setIsOpenAddAddress] = useState<boolean>(false);
    //#endregion Declare State

    //#region Create Variables
    const steps = [
        {
            title: 'Address',
            icon: <IconSVG IconComponent={icons.addressIcon} />,
            content: (
                <>
                    <Typography.Title level={2}>{t('user_order_select_address_tile')}</Typography.Title>
                    <Typography.Text>{t('user_order_select_address_description')}</Typography.Text>
                    <div className='flex my-6 gap-6  overflow-auto pb-10 border-b-2 border-gray-300'>
                        {
                            orderStore.address && (
                                // orderStore.address.map((user) => (
                                <Card
                                    title={`${orderStore?.address.nameCustomer}`}
                                    extra={<Checkbox checked></Checkbox>}
                                    style={{ minWidth: 300 }}
                                >
                                    <Typography.Text>{`${
                                        orderStore?.address.address ?? 'No address yet, please update address'
                                    }`}</Typography.Text>
                                    <div className='flex justify-around mt-5'>
                                        <Button
                                            type='primary'
                                            size='large'
                                            onClick={() => console.log(orderStore?.address)}
                                        >
                                            <IconSVG IconComponent={icons.editIcon} /> {`${t('common_edit')}`}
                                        </Button>
                                        <Button
                                            size='large'
                                            className='bg-red-600'
                                            onClick={() => console.log(orderStore?.address)}
                                        >
                                            <IconSVG IconComponent={icons.deleteIcon} /> {`${t('common_delete')}`}
                                        </Button>
                                    </div>
                                </Card>
                            )
                            /* ))} */
                        }
                    </div>
                    <div className='flex justify-around'>
                        <Button type='primary' size='large' onClick={() => setIsOpenAddAddress(true)}>
                            Add New Address
                        </Button>
                        <Button type='primary' size='large' onClick={() => setStep(1)}>
                            Next Payment Method
                        </Button>
                    </div>
                </>
            ),
        },
        {
            title: 'Payment Method',
            icon: <IconSVG IconComponent={icons.addressIcon} />,
            content: (
                <div className='w-full flex flex-col gap-8'>
                    <Typography.Title level={2}>{t('user_order_select_payment_method_tile')}</Typography.Title>
                    <Radio.Group
                        size='large'
                        value={paymentMethod}
                        style={{ width: '100%' }}
                        onChange={onChangePaymentMethod}
                    >
                        <Space direction='vertical' className='gap-6'>
                            <Radio value='Cash on Delivery'>
                                <Typography.Text className='text-xl'>Cash on Delivery</Typography.Text>
                            </Radio>
                            <Radio value='Debit/Credit Card'>
                                <Typography.Text className='text-xl'>Debit/Credit Card</Typography.Text>
                            </Radio>
                            {paymentMethod === 'Debit/Credit Card' && (
                                <Form>
                                    <Form.Item>
                                        <Input size='large' placeholder='Expiration Date' />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input size='large' placeholder='Card Name' />
                                    </Form.Item>
                                    <Row justify='space-between' className='gap-6'>
                                        <Form.Item>
                                            <DatePicker size='large' placeholder='Expiration Date' />
                                        </Form.Item>
                                        <Form.Item>
                                            <Input.Password size='large' placeholder='Card Number' />
                                        </Form.Item>
                                    </Row>
                                    <Button type='primary' size='large'>
                                        Add Card
                                    </Button>
                                </Form>
                            )}
                            <Radio value='Google Pay'>
                                <Typography.Text className='text-xl'>Google Pay</Typography.Text>
                            </Radio>
                            {paymentMethod === 'Google Pay' && (
                                <Space direction='vertical' align='center'>
                                    <QRCode value={'https://www.google.com'} />
                                </Space>
                            )}
                            {/* <Radio value='PayPal'>
                                <Typography.Text className='text-xl'>PayPal</Typography.Text>
                            </Radio> */}
                        </Space>
                    </Radio.Group>
                    <Button type='primary' size='large' onClick={() => setStep(2)}>
                        Continue
                    </Button>
                </div>
            ),
        },
        {
            title: 'Review',
            icon: <IconSVG IconComponent={icons.addressIcon} />,
            content: (
                <>
                    <div className={cx('rowReview')}>
                        <Typography.Title level={3}>
                            {t('user_order_estimated_delivery_tile')} {estimatedDate.toLocaleDateString()}
                        </Typography.Title>
                        {orderStore &&
                            orderStore.products.map((product, index) => (
                                <div key={index} className={cx('columnsProduct')}>
                                    <Image
                                        width={100}
                                        height={100}
                                        src={`${baseURL}/${product.image}`}
                                        alt={product.name}
                                    />
                                    <div>
                                        <Typography.Title level={5}>{`${
                                            product.name ?? renderFormatValue(product.name)
                                        }`}</Typography.Title>
                                        <div className={cx('typeProduct')}>
                                            <div className='flex gap-3'>
                                                <Typography.Title level={5}>
                                                    {t('user_products_price_label_table')}
                                                </Typography.Title>
                                                <Typography.Text>{`${product.price}`}</Typography.Text>
                                            </div>
                                            <div className='flex flex-row gap-4 items-center'>
                                                <div className='flex'>
                                                    <Typography.Title level={5}>
                                                        {t('user_order_type_size_products_label')}
                                                    </Typography.Title>
                                                    <Typography.Text>{`${
                                                        product.size ?? renderFormatValue(product.size)
                                                    }`}</Typography.Text>
                                                </div>
                                                <div className='flex items-center content-center gap-2'>
                                                    <Typography.Title level={5}>
                                                        {t('user_order_type_color_products_label')}
                                                    </Typography.Title>
                                                    <Tag color={`${product.color}`} className={cx(`h-[20px]`)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className={cx('rowReview')}>
                        <Typography.Title level={3}>{t('user_order_shipping_address_title')}</Typography.Title>
                        <div>
                            <Typography.Title level={5}>{orderStore.address.nameCustomer}</Typography.Title>
                            <Typography.Text>{orderStore.address.address}</Typography.Text>
                        </div>
                    </div>
                    <div className={cx('rowReview')}>
                        <Typography.Title level={3}>{t('user_order_payment_method_label')}</Typography.Title>
                        <div>
                            <Typography.Title level={5}>{orderStore.paymentMethod}</Typography.Title>
                        </div>
                    </div>
                </>
            ),
        },
    ];
    //#endregion Create Variables

    //#region Implement Hook
    useEffect(() => {
        if (step === 2) {
            setCurrentStep(3);
        }
    }, [step]);
    //#endregion Implement Hook

    //#region Handle Function
    function onChangePaymentMethod(e: RadioChangeEvent) {
        setPaymentMethod(e.target.value as string);
        dispatch(orderActions.updatePaymentMethod({ paymentMethod: e.target.value }));
    }

    function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    }

    function handleAddShippingAddress() {
        dispatch(orderActions.updateShippingAddress({ shippingAddress }));
        setIsOpenAddAddress(false);
    }
    //#endregion Handle Function

    return (
        <div id='shippingAddressComponent' className={cx('mainShippingAddress')}>
            <div className={cx('headerShippingAddress')}>
                <Typography.Title level={2}>{t('user_order_shipping_address_title')}</Typography.Title>
            </div>
            <div className={cx('bodyShippingAddress')}>
                <Steps current={step} onChange={(value) => setStep(value)} size='small' className='mb-6'>
                    {steps.map((step) => (
                        <Step key={step.title} title={step.title} />
                    ))}
                </Steps>
                {steps[step].content}
            </div>

            {isOpenAddAddress && (
                <Modal
                    open={isOpenAddAddress}
                    title='Add New Shipping Address'
                    footer={[
                        <Button type='primary' size='large' onClick={handleAddShippingAddress}>
                            {t('common_save')}
                        </Button>,
                    ]}
                    onCancel={() => setIsOpenAddAddress(false)}
                >
                    <Space direction='vertical' className='gap-6 w-full'>
                        <Input
                            name='nameCustomer'
                            size='large'
                            placeholder='Name Customer'
                            onChange={handleChangeInput}
                        />
                        <Input name='phone' size='large' placeholder='Phone' onChange={handleChangeInput} />
                        <Input name='address' size='large' placeholder='Address' onChange={handleChangeInput} />
                    </Space>
                </Modal>
            )}
        </div>
    );
};

export default ShippingAddress;
