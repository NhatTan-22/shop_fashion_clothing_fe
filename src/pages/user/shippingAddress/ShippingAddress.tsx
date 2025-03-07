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
    Radio,
    Row,
    Space,
    Steps,
    Tag,
    Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import type { RadioChangeEvent } from 'antd';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './ShippingAddress.module.scss';
import { IconSVG } from '~/components';
import { icons } from '~/assets';
import { useEffect, useState } from 'react';
import { orders } from '~/utils/constants/mockData';
import { baseURL } from '~/utils/constants/env';
import { renderFormatValue } from '~/utils/constants/helper';
import { useAppSelector } from '~/redux/hooks';
import { useOutletContext } from 'react-router-dom';

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
    //#endregion Declare Hook

    //#region Selector
    const user = useAppSelector((state) => state.auth.address);
    const { setCurrentStep } = useOutletContext<{ currentStep: number; setCurrentStep: (step: number) => void }>();
    //#endregion Selector

    //#region Declare State
    const [step, setStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
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
                        {user &&
                            user.map((user) => (
                                <Card
                                    title={`${user?.firstName} ${user?.lastName}`}
                                    extra={<Checkbox checked></Checkbox>}
                                    style={{ minWidth: 300 }}
                                >
                                    <Typography.Text>{`${
                                        user?.address ?? 'No address yet, please update address'
                                    }`}</Typography.Text>
                                    <div className='flex justify-around mt-5'>
                                        <Button type='primary' size='large' onClick={() => console.log(user?._id)}>
                                            <IconSVG IconComponent={icons.editIcon} /> {`${t('common_edit')}`}
                                        </Button>
                                        <Button
                                            size='large'
                                            className='bg-red-600'
                                            onClick={() => console.log(user?._id)}
                                        >
                                            <IconSVG IconComponent={icons.deleteIcon} /> {`${t('common_delete')}`}
                                        </Button>
                                    </div>
                                </Card>
                            ))}
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
                            <Radio value='cod'>
                                <Typography.Text className='text-xl'>Cash on Delivery</Typography.Text>
                            </Radio>
                            <Radio value='card'>
                                <Typography.Text className='text-xl'>Debit/Credit Card</Typography.Text>
                            </Radio>
                            {paymentMethod === 'card' && (
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
                            <Radio value='google'>
                                <Typography.Text className='text-xl'>Google Pay</Typography.Text>
                            </Radio>
                            <Radio value='paypal'>
                                <Typography.Text className='text-xl'>PayPal</Typography.Text>
                            </Radio>
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
                    <Typography.Title level={2}>
                        {t('user_order_estimated_delivery_tile')} {estimatedDate.toLocaleDateString()}
                    </Typography.Title>
                    {orders.map((order, index) => (
                        <div key={index} className={cx('columnsProduct')}>
                            <Image width={200} src={`${baseURL}/${order.image}`} alt={order.name} />
                            <div>
                                <Typography.Title level={5}>{`${
                                    order.name ?? renderFormatValue(order.name)
                                }`}</Typography.Title>
                                <div className={cx('typeProduct')}>
                                    <div className='flex gap-3'>
                                        <Typography.Title level={5}>
                                            {t('user_products_price_label_table')}
                                        </Typography.Title>
                                        <Typography.Text>{`${order.price}`}</Typography.Text>
                                    </div>
                                    <div className='flex flex-row gap-4 items-center'>
                                        <div className='flex'>
                                            <Typography.Title level={5}>
                                                {t('user_order_type_size_products_label')}
                                            </Typography.Title>
                                            <Typography.Text>{`${
                                                order.size ?? renderFormatValue(order.size)
                                            }`}</Typography.Text>
                                        </div>
                                        <div className='flex items-center content-center gap-2'>
                                            <Typography.Title level={5}>
                                                {t('user_order_type_color_products_label')}
                                            </Typography.Title>
                                            <Tag color={`${order.color}`} className={cx(`h-[20px]`)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
        setPaymentMethod(e.target.value);
    }
    //#endregion Handle Function

    return (
        <div id='shippingAddressComponent' className={cx('mainShippingAddress')}>
            <div className={cx('headerShippingAddress')}>
                <Typography.Title level={2}>{t('user_order_shipping_address_tile')}</Typography.Title>
            </div>
            <div className={cx('bodyShippingAddress')}>
                <Steps current={step} size='small' className='mb-6' labelPlacement='vertical'>
                    {steps.map((step) => (
                        <Step key={step.title} title={step.title} />
                    ))}
                </Steps>
                {steps[step].content}
            </div>
        </div>
    );
};

export default ShippingAddress;
