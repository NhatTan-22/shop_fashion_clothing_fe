// Libs
import classNames from 'classnames/bind';
import { Col, Form, GetProp, Input, message, Modal, Row, Select, Upload, UploadFile, UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
// Components, Layouts, Pages
// Others
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { baseURL } from '~/utils/constants/env';
import { urlApiSupplier } from '~/utils/constants/actionType';
// Styles, Images, icons
import styles from './FormAddSupplier.module.scss';
import { useAppDispatch } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { addSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { BaseButton } from '~/components';
import { ButtonStyleEnum } from '~/utils/constants/enum';

type Props = {
    isShowModal?: boolean;
    onClose: () => void;
};

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
    const [supplier, setSupplier] = useState<ISupplier>({
        supplierCode: '',
        supplierName: '',
        supplierImage: null,
        supplierPhone: 0,
        supplierEmail: '',
        supplierAddress: '',
        productCode: '',
        isTaking: [],
        quantityImported: 0,
    });
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleGetInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSupplier((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onChange: UploadProps['onChange'] = ({ file: newFile }) => {
        if (newFile.status === 'done') {
            setSupplier({
                ...supplier,
                supplierImage: newFile.originFileObj || null,
            });
        }
    };

    const handleAddSupplier = async () => {
        try {
            await form.validateFields();
            const formData = new FormData();
            Object.entries(supplier).forEach(([key, value]) => {
                if (key === 'isTaking') {
                    formData.append(key, JSON.stringify(value));
                } else if (key === 'supplierImage' && value) {
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

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
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
                    <div>
                        <BaseButton
                            styleButton={ButtonStyleEnum.PRIMARY}
                            onClick={handleAddSupplier}
                            nameButton='Add Supplier'
                        />
                    </div>
                </div>
            }
        >
            <Form form={form} name='addSupplier' className={cx('formAddSupplier')} onFinish={handleAddSupplier}>
                <Row justify='space-between'>
                    <Col span={11}>
                        <Form.Item
                            name='supplierCode'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='supplierCode'>
                                    {t('admin_supplier_code_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_code_required')}` }]}
                            style={{ width: '100%' }}
                        >
                            <Input
                                className={cx('inputFormAddSupplier')}
                                id='supplierCode'
                                name='supplierCode'
                                value={supplier.productCode}
                                type='text'
                                size='large'
                                autoFocus
                                placeholder={t('admin_add_supplier_code_placeholder')}
                                title={t('admin_supplier_code_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                        <Form.Item
                            name='supplierName'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='supplierName'>
                                    {t('admin_supplier_name_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_name_required')}` }]}
                            style={{ width: '100%' }}
                        >
                            <Input
                                className={cx('inputFormAddSupplier')}
                                id='supplierName'
                                name='supplierName'
                                type='text'
                                size='large'
                                placeholder={t('admin_add_supplier_name_placeholder')}
                                title={t('admin_supplier_name_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                        <Form.Item
                            name='supplierPhone'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='supplierPhone'>
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
                                // addonBefore={
                                //     <Select
                                //         defaultValue='+84'
                                //         style={{ width: 70 }}
                                //         onSelect={(e) => setCountryCode(e)}
                                //     >
                                //         <Option value='+1'>+1</Option>
                                //         <Option value='+44'>+44</Option>
                                //         <Option value='+91'>+91</Option>
                                //         <Option value='+84'>+84</Option>
                                //     </Select>
                                // }
                                className={cx('inputFormAddSupplier')}
                                id='supplierPhone'
                                name='supplierPhone'
                                type='tel'
                                size='large'
                                placeholder={t('admin_add_supplier_phone_placeholder')}
                                title={t('admin_supplier_contact_phone_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                        <Form.Item
                            name='supplierEmail'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='supplierEmail'>
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
                                className={cx('inputFormAddSupplier')}
                                id='supplierEmail'
                                name='supplierEmail'
                                type='email'
                                size='large'
                                placeholder={t('admin_add_supplier_email_placeholder')}
                                title={t('admin_supplier_email_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                        <Form.Item
                            name='supplierAddress'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='supplierAddress'>
                                    {t('admin_supplier_address_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_address_required')}` }]}
                            style={{ width: '100%' }}
                        >
                            <TextArea
                                className={cx('inputFormAddSupplier')}
                                id='supplierAddress'
                                name='supplierAddress'
                                rows={4}
                                size='large'
                                maxLength={255}
                                placeholder={t('admin_add_supplier_address_placeholder')}
                                title={t('admin_supplier_address_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Upload
                            name='supplierImage'
                            className={cx('uploadFormAddSupplier')}
                            listType='picture-circle'
                            customRequest={(options: any) => {
                                options.onSuccess?.({}, options.file);
                            }}
                            onChange={onChange}
                            onPreview={onPreview}
                            maxCount={1}
                        >
                            <button style={{ border: 0, background: 'none' }} type='button'>
                                <div style={{ marginTop: 8 }}>{`+ Upload`}</div>
                            </button>
                        </Upload>
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
                                className={cx('inputFormAddSupplier')}
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
                            name='quantityImported'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='quantityImported'>
                                    {t('admin_supplier_quantity_imported_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_quantity_import_required')}` }]}
                            style={{ width: '100%' }}
                        >
                            <Input
                                className={cx('inputFormAddSupplier')}
                                id='quantityImported'
                                name='quantityImported'
                                type='number'
                                size='large'
                                placeholder={t('admin_add_supplier_quantity_import_placeholder')}
                                title={t('admin_supplier_quantity_imported_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default FormAddSupplier;
