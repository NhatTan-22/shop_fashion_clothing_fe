// Libs
import classNames from 'classnames/bind';
import { Col, Form, GetProp, Input, Modal, Row, Select, Space, Upload, UploadFile, UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
// Components, Layouts, Pages
// Others
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
// Styles, Images, icons
import styles from './FormAddProduct.module.scss';
import { BaseButton } from '~/components';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { icons } from '~/assets';

type Props = {
    isShowModal?: boolean;
    onCancel: () => void;
};

const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const cx = classNames.bind(styles);

const FormAddProduct = (props: Props) => {
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
    const handleGetInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {};

    const handleAddProduct = async () => {};

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
            title={<div className={cx('modalTitle')}>{t('admin_product_new_product_title')}</div>}
            centered
            className={cx('modalAddProduct')}
            open={isShowModal}
            onCancel={onCancel}
            onOk={handleAddProduct}
        >
            <Form name='addProduct' className={cx('formAddProduct')} onFinish={handleAddProduct}>
                <Row justify='space-between'>
                    <Col span={6}>
                        <Upload
                            name='productImage'
                            className={cx('uploadFormAddProduct')}
                            listType='picture-card'
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
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name='productCode'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='productCode'>
                                    {t('admin_product_code_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_product_code_required')}` }]}
                        >
                            <Input
                                className={cx('inputFormAddProduct')}
                                id='productCode'
                                name='productCode'
                                type='text'
                                autoFocus
                                placeholder={t('admin_add_product_code_placeholder')}
                                title={t('admin_product_code_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                        <Form.Item
                            name='productName'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='productName'>
                                    {t('admin_product_name_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_product_name_required')}` }]}
                        >
                            <Input
                                className={cx('inputFormAddProduct')}
                                id='productName'
                                name='productName'
                                type='text'
                                placeholder={t('admin_add_product_name_placeholder')}
                                title={t('admin_product_name_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item
                            name='productDescription'
                            label={
                                <label className={cx('labelAddProduct')} htmlFor='productDescription'>
                                    {t('admin_product_description_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_product_description_required')}` }]}
                        >
                            <TextArea
                                className={cx('inputFormAddProduct')}
                                id='productDescription'
                                name='productDescription'
                                rows={4}
                                maxLength={255}
                                placeholder={t('admin_add_product_description_placeholder')}
                                title={t('admin_product_description_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify='start'>
                    <div className={cx('labelProduct')}>{t('admin_product_prices_label')}</div>
                </Row>
                <Row justify={'space-around'}>
                    <Col>
                        <Form.Item
                            name='sellingPrice'
                            label={
                                <label className={cx('labelAddProduct')} htmlFor='sellingPrice'>
                                    {t('admin_product_selling_price_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_product_selling_price_required')}` }]}
                        >
                            <Input
                                className={cx('inputFormAddProduct')}
                                id='sellingPrice'
                                name='sellingPrice'
                                type='number'
                                autoFocus
                                placeholder={t('admin_add_product_selling_price_placeholder')}
                                title={t('admin_product_selling_price_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            name='promotionPrice'
                            label={
                                <label className={cx('labelAddProduct')} htmlFor='promotionPrice'>
                                    {t('admin_product_promotion_price_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_product_promotion_price_required')}` }]}
                        >
                            <Input
                                className={cx('inputFormAddProduct')}
                                id='promotionPrice'
                                name='promotionPrice'
                                type='number'
                                placeholder={t('admin_add_product_promotion_price_placeholder')}
                                title={t('admin_product_promotion_price_label_input')}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='start'>
                    <div className={cx('labelProduct')}>{t('admin_product_variants_label')}</div>
                </Row>
                <Form.List name='sizes'>
                    {(fields, { add, remove }) => (
                        <>
                            <Row justify={'space-between'} style={{ marginRight: '50px' }}>
                                <Col style={{ width: '220px' }}>
                                    <Upload
                                        name='supplierImage'
                                        className={cx('uploadFormAddProduct')}
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
                                </Col>
                                <Col className={cx('form')} span={24}>
                                    <Row>
                                        <Col span={9}>
                                            <Form.Item
                                                name='size'
                                                label={
                                                    <label className={cx('labelAddProduct')} htmlFor='size'>
                                                        {t('admin_product_size_label_input')}
                                                    </label>
                                                }
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: `${t('admin_add_product_size_required')}`,
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className={cx('inputFormAddProduct')}
                                                    id='size'
                                                    name='size'
                                                    type='text'
                                                    placeholder={t('admin_add_product_size_placeholder')}
                                                    title={t('admin_product_size_label_input')}
                                                    onChange={handleGetInput}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name='storeQuantity'
                                                label={
                                                    <label className={cx('labelAddProduct')} htmlFor='storeQuantity'>
                                                        {t('admin_product_store_quantity_label_input')}
                                                    </label>
                                                }
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: `${t('admin_add_product_store_quantity_required')}`,
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className={cx('inputFormAddProduct')}
                                                    id='storeQuantity'
                                                    name='storeQuantity'
                                                    type='text'
                                                    placeholder={t('admin_add_product_store_quantity_placeholder')}
                                                    title={t('admin_product_store_quantity_label_input')}
                                                    onChange={handleGetInput}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name='sellingQuantity'
                                                label={
                                                    <label className={cx('labelAddProduct')} htmlFor='sellingQuantity'>
                                                        {t('admin_product_selling_quantity_label_input')}
                                                    </label>
                                                }
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: `${t('admin_add_product_selling_quantity_required')}`,
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className={cx('inputFormAddProduct')}
                                                    id='sellingQuantity'
                                                    name='sellingQuantity'
                                                    type='text'
                                                    placeholder={t('admin_add_product_promotion_price_placeholder')}
                                                    title={t('admin_add_product_selling_quantity_placeholder')}
                                                    onChange={handleGetInput}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            {fields.map(({ key, name, ...restField }) => (
                                <Row>
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                                        <Row justify={'space-between'}>
                                            <Col style={{ width: '220px' }}>
                                                <Upload
                                                    {...restField}
                                                    name='supplierImage'
                                                    className={cx('uploadFormAddProduct')}
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
                                            </Col>
                                            <Col className={cx('form')}>
                                                <Row>
                                                    <Col span={13}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'size']}
                                                            label={
                                                                <label className={cx('labelAddProduct')} htmlFor='size'>
                                                                    {t('admin_product_size_label_input')}
                                                                </label>
                                                            }
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: `${t('admin_add_product_size_required')}`,
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                className={cx('inputFormAddProduct')}
                                                                id='size'
                                                                name='size'
                                                                type='text'
                                                                placeholder={t('admin_add_product_size_placeholder')}
                                                                title={t('admin_product_size_label_input')}
                                                                onChange={handleGetInput}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name='storeQuantity'
                                                            label={
                                                                <label
                                                                    className={cx('labelAddProduct')}
                                                                    htmlFor='storeQuantity'
                                                                >
                                                                    {t('admin_product_promotion_price_label_input')}
                                                                </label>
                                                            }
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: `${t(
                                                                        'admin_add_product_promotion_price_required'
                                                                    )}`,
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                className={cx('inputFormAddProduct')}
                                                                id='storeQuantity'
                                                                name='storeQuantity'
                                                                type='text'
                                                                placeholder={t(
                                                                    'admin_add_product_promotion_price_placeholder'
                                                                )}
                                                                title={t('admin_product_promotion_price_label_input')}
                                                                onChange={handleGetInput}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'storeQuantity']}
                                                            label={
                                                                <label
                                                                    className={cx('labelAddProduct')}
                                                                    htmlFor='sellingQuantity'
                                                                >
                                                                    {t('admin_product_selling_quantity_label_input')}
                                                                </label>
                                                            }
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: `${t(
                                                                        'admin_add_product_selling_quantity_required'
                                                                    )}`,
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                className={cx('inputFormAddProduct')}
                                                                id='sellingQuantity'
                                                                name='sellingQuantity'
                                                                type='text'
                                                                placeholder={t(
                                                                    'admin_add_product_promotion_price_placeholder'
                                                                )}
                                                                title={t(
                                                                    'admin_add_product_selling_quantity_placeholder'
                                                                )}
                                                                onChange={handleGetInput}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Space>

                                    <BaseButton
                                        styleButton={ButtonStyleEnum.TEXT}
                                        className={cx('styleButton')}
                                        prevIcon={icons.deleteIcon}
                                        onClick={() => remove(name)}
                                    />
                                </Row>
                            ))}

                            <Row>
                                <BaseButton
                                    styleButton={ButtonStyleEnum.PRIMARY}
                                    nameButton={t('admin_product_add_variant_label')}
                                    onClick={() => add()}
                                />
                            </Row>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default FormAddProduct;
