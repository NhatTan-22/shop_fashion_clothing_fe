// Libs
import classNames from 'classnames/bind';
import { Col, Form, GetProp, Input, Modal, Row, Select, Upload, UploadFile, UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
// Components, Layouts, Pages
// Others
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
// Styles, Images, icons
import styles from './FormAddInventory.module.scss';

type Props = {
    isShowModal?: boolean;
    onCancel: () => void;
};

const { Option } = Select;
const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const cx = classNames.bind(styles);

const FormAddSupplier = (props: Props) => {
    //#region Destructuring Props
    const { isShowModal, onCancel } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [supplier, setSupplier] = useState<ISupplier>();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+84');

    const [fileList, setFileList] = useState<UploadFile>();
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleGetInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    };

    const handleAddSupplier = async () => {};

    const onChange: UploadProps['onChange'] = ({ file: newFile }) => {
        setFileList(newFile);
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
            title={<div className={cx('modalTitle')}>{t('admin_supplier_add_supplier_title')}</div>}
            centered
            className={cx('modalAddSupplier')}
            open={isShowModal}
            onCancel={onCancel}
            onOk={handleAddSupplier}
        >
            <Form name='addSupplier' className={cx('formAddSupplier')} onFinish={handleAddSupplier}>
                <Row justify='space-between'>
                    <Col span={11}>
                        <Form.Item
                            name='supplierCode'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='supplierCode'>
                                    {t('admin_supplier_code_label')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_code_required')}` }]}
                        >
                            <Input
                                className={cx('inputFormAddSupplier')}
                                id='supplierCode'
                                name='supplierCode'
                                type='text'
                                autoFocus
                                placeholder={t('admin_add_supplier_code_placeholder')}
                                title={t('admin_supplier_code_label')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                        <Form.Item
                            name='supplierName'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='supplierName'>
                                    {t('admin_supplier_name_label')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_name_required')}` }]}
                        >
                            <Input
                                className={cx('inputFormAddSupplier')}
                                id='supplierName'
                                name='supplierName'
                                type='text'
                                placeholder={t('admin_add_supplier_name_placeholder')}
                                title={t('admin_supplier_name_label')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                        <Form.Item
                            name='supplierPhone'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='supplierPhone'>
                                    {t('admin_supplier_contact_phone_label')}
                                </label>
                            }
                            rules={[
                                { required: true, message: `${t('admin_add_supplier_phone_required')}` },
                                {
                                    pattern: /^[0-9]{10,12}$/,
                                    message: `${t('admin_add_supplier_phone_pattern')}`,
                                },
                            ]}
                        >
                            <Input
                                addonBefore={
                                    <Select defaultValue='+84' style={{ width: 70 }}>
                                        <Option value='+1'>+1</Option>
                                        <Option value='+44'>+44</Option>
                                        <Option value='+91'>+91</Option>
                                        <Option value='+84'>+84</Option>
                                    </Select>
                                }
                                className={cx('inputFormAddSupplier')}
                                id='supplierPhone'
                                name='supplierPhone'
                                type='tel'
                                placeholder={t('admin_add_supplier_phone_placeholder')}
                                title={t('admin_supplier_contact_phone_label')}
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
                                    message: `${t('admin_add_supplier_email_invalid')}`,
                                },
                            ]}
                        >
                            <Input
                                className={cx('inputFormAddSupplier')}
                                id='supplierEmail'
                                name='supplierEmail'
                                type='email'
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
                        >
                            <TextArea
                                className={cx('inputFormAddSupplier')}
                                id='supplierAddress'
                                name='supplierAddress'
                                rows={4}
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
                            action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                            listType='picture-card'
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
                                    {t('admin_supplier_product_code_label')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_product_code_required')}` }]}
                        >
                            <Input
                                className={cx('inputFormAddSupplier')}
                                id='productCode'
                                name='productCode'
                                type='number'
                                placeholder={t('admin_add_supplier_product_code_placeholder')}
                                title={t('admin_supplier_product_code_label')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>

                        <Form.Item
                            name='quantityImported'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='quantityImported'>
                                    {t('admin_supplier_quantity_imported_label')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_quantity_import_required')}` }]}
                        >
                            <Input
                                className={cx('inputFormAddSupplier')}
                                id='quantityImported'
                                name='quantityImported'
                                type='number'
                                placeholder={t('admin_add_supplier_quantity_import_placeholder')}
                                title={t('admin_supplier_quantity_imported_label')}
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
