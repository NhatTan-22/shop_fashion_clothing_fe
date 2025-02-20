// Libs
import classNames from 'classnames/bind';
import { Col, Form, GetProp, Input, message, Modal, Row, Select, Steps, Upload, UploadFile, UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
// Components, Layouts, Pages
// Others
import { IAddSupplier } from '~/utils/interfaces/interfaceSupplier';
// Styles, Images, icons
import styles from './FormAddSupplier.module.scss';
import { useAppDispatch } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { addSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { BaseButton } from '~/components';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { supplierActions } from '~/thunks/supplier/supplierSlice';
import { UploadChangeParam } from 'antd/es/upload';

type Props = {
    isShowModal?: boolean;
    onClose: () => void;
};

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const cx = classNames.bind(styles);

const FormAddSupplier = (props: Props) => {
    //#region Destructuring Props
    const { isShowModal, onClose } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    const [form] = Form.useForm();

    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [supplier, setSupplier] = useState<Partial<IAddSupplier>>({});
    const [currentStep, setCurrentStep] = useState(0);
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const steps = [
        {
            title: `${t('admin_supplier_information_label')}`,
            content: (
                <>
                    <Row style={{ justifyContent: 'center' }}>
                        <Upload
                            name='image'
                            className={cx('uploadFormAddSupplier')}
                            listType='picture-circle'
                            customRequest={(options: any) => {
                                options.onSuccess?.({}, options.file);
                            }}
                            action={'http://localhost:8080/suppliers/new-add'}
                            onChange={onChange}
                            onPreview={onPreview}
                            maxCount={1}
                        >
                            <button style={{ border: 0, background: 'none' }} type='button'>
                                <div style={{ marginTop: 8 }}>{`+ Upload`}</div>
                            </button>
                        </Upload>
                    </Row>

                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
                            <Form.Item
                                name='sku'
                                label={
                                    <label className={cx('labelAddSupplier')} htmlFor='sku'>
                                        {t('admin_supplier_code_label_input')}
                                    </label>
                                }
                                rules={[{ required: true, message: `${t('admin_add_supplier_code_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    id='sku'
                                    name='sku'
                                    type='text'
                                    size='large'
                                    autoFocus
                                    placeholder={t('admin_add_supplier_code_placeholder')}
                                    title={t('admin_supplier_code_label_input')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='name'
                                label={
                                    <label className={cx('labelAddSupplier')} htmlFor='name'>
                                        {t('admin_supplier_name_label_input')}
                                    </label>
                                }
                                rules={[{ required: true, message: `${t('admin_add_supplier_name_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    id='name'
                                    name='name'
                                    type='text'
                                    size='large'
                                    placeholder={t('admin_add_supplier_name_placeholder')}
                                    title={t('admin_supplier_name_label_input')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
                            <Form.Item
                                name='phone'
                                label={
                                    <label className={cx('labelAddSupplier')} htmlFor='phone'>
                                        {t('admin_supplier_contact_phone_label_input')}
                                    </label>
                                }
                                rules={[
                                    { required: true, message: `${t('admin_add_supplier_phone_required')}` },
                                    {
                                        pattern: /^[0-9]{10,12}$/,
                                        message: `${t('admin_add_supplier_phone_pattern')}`,
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    id='phone'
                                    name='phone'
                                    type='tel'
                                    size='large'
                                    placeholder={t('admin_add_supplier_phone_placeholder')}
                                    title={t('admin_supplier_contact_phone_label_input')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='email'
                                label={
                                    <label className={cx('labelAddSupplier')} htmlFor='email'>
                                        {t('admin_supplier_email_label_input')}
                                    </label>
                                }
                                rules={[
                                    { required: true, message: `${t('admin_add_supplier_email_required')}` },
                                    {
                                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: `${t('admin_add_supplier_email_pattern')}`,
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    size='large'
                                    placeholder={t('admin_add_supplier_email_placeholder')}
                                    title={t('admin_supplier_email_label_input')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name='address'
                        label={
                            <label className={cx('labelAddSupplier')} htmlFor='address'>
                                {t('admin_supplier_address_label_input')}
                            </label>
                        }
                        rules={[{ required: true, message: `${t('admin_add_supplier_address_required')}` }]}
                        style={{ width: '100%' }}
                    >
                        <TextArea
                            id='address'
                            name='address'
                            rows={4}
                            size='large'
                            maxLength={255}
                            placeholder={t('admin_add_supplier_address_placeholder')}
                            title={t('admin_supplier_address_label_input')}
                            onChange={handleGetInput}
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            title: `${t('admin_import_product_information_label')}`,
            content: (
                <>
                    <Form.Item
                        name='productCode'
                        label={
                            <label className={cx('labelAddSupplier')} htmlFor='productCode'>
                                {t('admin_supplier_product_code_label_input')}
                            </label>
                        }
                        rules={[{ required: true, message: `${t('admin_add_supplier_product_code_required')}` }]}
                    >
                        <Input
                            id='productCode'
                            name='productCode'
                            type='text'
                            size='large'
                            placeholder={t('admin_add_supplier_product_code_placeholder')}
                            title={t('admin_supplier_product_code_label_input')}
                            onChange={handleGetInput}
                        />
                    </Form.Item>
                    <Form.Item
                        name='importQuantity'
                        label={
                            <label className={cx('labelAddSupplier')} htmlFor='importQuantity'>
                                {t('admin_supplier_quantity_imported_label_input')}
                            </label>
                        }
                        rules={[{ required: true, message: `${t('admin_add_supplier_quantity_import_required')}` }]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            id='importQuantity'
                            name='importQuantity'
                            type='number'
                            size='large'
                            min={0}
                            placeholder={t('admin_add_supplier_quantity_import_placeholder')}
                            title={t('admin_supplier_quantity_imported_label_input')}
                            onChange={handleGetInput}
                        />
                    </Form.Item>
                    <Form.Item
                        name='importPrice'
                        label={
                            <label className={cx('labelAddSupplier')} htmlFor='importPrice'>
                                {t('admin_supplier_price_imported_label_input')}
                            </label>
                        }
                        rules={[{ required: true, message: `${t('admin_add_supplier_price_import_required')}` }]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            id='importPrice'
                            name='importPrice'
                            type='number'
                            min={0}
                            max={999}
                            size='large'
                            placeholder={t('admin_add_supplier_price_import_placeholder')}
                            title={t('admin_supplier_price_imported_label_input')}
                            onChange={handleGetInput}
                        />
                    </Form.Item>
                </>
            ),
        },
    ];

    async function onPreview(file: UploadFile) {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as File);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    }

    function onChange({ file }: UploadChangeParam<UploadFile<any>>): void {
        if (file.status === 'done') {
            setSupplier((prevSupplier) => ({
                ...prevSupplier,
                supplierImage: file.originFileObj || null,
            }));
        }
    }

    function handleGetInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSupplier((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const nextStep = async () => {
        try {
            await form.validateFields();
            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleAddSupplier = async () => {
        try {
            await form.validateFields();
            const formData = new FormData();

            Object.entries(supplier).forEach(([key, value]) => {
                if (key === 'isTaking') {
                    formData.append(key, JSON.stringify(value));
                } else if (key === 'supplierImage' && value instanceof File) {
                    formData.append(key, value);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            loadingContext?.show();
            dispatch(addSupplierThunk(formData))
                .unwrap()
                .then((response) => {
                    message.success(response.message);
                    form.resetFields();
                    dispatch(supplierActions.setRefreshTableTrue());
                })
                .catch((error) => {
                    message.error(error.message);
                })
                .finally(() => {
                    loadingContext?.hide();
                    onClose();
                });
        } catch (error) {
            message.error('Please enter complete information.');
        }
    };

    const handleClear = () => {
        form.resetFields();
    };
    //#endregion Handle Function

    return (
        <Modal
            title={<div className={cx('modalTitle')}>{t('admin_supplier_new_supplier_title')}</div>}
            centered
            className={cx('modalAddSupplier')}
            open={isShowModal}
            onCancel={onClose}
            footer={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <BaseButton styleButton={ButtonStyleEnum.TEXT} onClick={handleClear} nameButton='Clear' />
                    </div>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {currentStep > 0 && <BaseButton onClick={prevStep} nameButton='Previous' />}
                        {currentStep < steps.length - 1 && (
                            <BaseButton nameButton='Next' styleButton={ButtonStyleEnum.PRIMARY} onClick={nextStep} />
                        )}
                        {currentStep === steps.length - 1 && (
                            <BaseButton
                                nameButton='Add Supplier'
                                styleButton={ButtonStyleEnum.PRIMARY}
                                onClick={handleAddSupplier}
                            />
                        )}
                    </div>
                </div>
            }
        >
            <Steps current={currentStep} style={{ marginBottom: 24 }}>
                {steps.map((step) => (
                    <Step key={step.title} title={step.title} />
                ))}
            </Steps>
            <Form
                layout='vertical'
                form={form}
                // initialValues={{ sizes: [{}] }}
                name='addSupplier'
                className={cx('formAddSupplier')}
                onFinish={handleAddSupplier}
            >
                {steps[currentStep].content}
            </Form>
        </Modal>
    );
};

export default FormAddSupplier;
