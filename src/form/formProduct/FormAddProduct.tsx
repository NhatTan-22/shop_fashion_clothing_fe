// Libs
import classNames from 'classnames/bind';
import {
    Col,
    Form,
    GetProp,
    Input,
    message,
    Modal,
    Row,
    Select,
    Space,
    Steps,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormInstance, useForm } from 'antd/es/form/Form';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './FormAddProduct.module.scss';
import { icons } from '~/assets';
import { useAppDispatch } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { getSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { getCategoryThunk } from '~/thunks/category/categoryThunk';

type Props = {
    isShowModal?: boolean;
    onCancel: () => void;
};

const { Step } = Steps;
const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const cx = classNames.bind(styles);

const FormAddProduct = (props: Props) => {
    //#region Destructuring Props
    const { isShowModal, onCancel } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const [form] = useForm<FormInstance>();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [currentStep, setCurrentStep] = useState(0);
    const [supplier, setSupplier] = useState<ISupplier>();
    const [optionCategory, setOptionCategory] = useState([]);
    const [optionSupplierCode, setOptionSupplierCode] = useState();

    const [fileList, setFileList] = useState<UploadFile>();
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const steps = [
        {
            title: `${t('admin_product_information_label')}`,
            content: (
                <>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Upload
                                name='productImage'
                                className={cx('uploadFormAddProduct')}
                                listType='picture-card'
                                customRequest={(options: any) => {
                                    options.onSuccess?.({}, options.file);
                                }}
                                maxCount={1}
                            >
                                <button style={{ border: 0, background: 'none' }} type='button'>
                                    <div style={{ marginTop: 8 }}>{`+ Upload`}</div>
                                </button>
                            </Upload>
                        </Col>

                        <Col span={11}>
                            <Form.Item
                                name='category'
                                rules={[{ required: true, message: `${t('admin_add_product_category_required')}` }]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    size='large'
                                    placeholder={t('admin_add_product_category_placeholder')}
                                    optionFilterProp='label'
                                    onChange={onChangeSelect}
                                    onSearch={onSearchCategory}
                                    options={optionCategory}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
                            <Form.Item
                                name='productCode'
                                label={t('admin_product_code_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_product_code_required')}` }]}
                            >
                                <Input size='large' placeholder={t('admin_add_product_code_placeholder')} />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='supplierCode'
                                label={t('admin_supplier_code_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_select_supplier_code_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    size='large'
                                    placeholder={t('admin_add_select_supplier_code_placeholder')}
                                    optionFilterProp='label'
                                    onChange={onChangeSelect}
                                    onSearch={onSearchSupplierCode}
                                    options={optionSupplierCode}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name='productName'
                        label={t('admin_product_name_label_input')}
                        rules={[{ required: true, message: `${t('admin_add_product_name_required')}` }]}
                        style={{ width: '100%' }}
                    >
                        <Input size='large' placeholder={t('admin_add_product_name_placeholder')} />
                    </Form.Item>

                    <Form.Item
                        name='productDescription'
                        label={t('admin_product_description_label_input')}
                        rules={[{ required: true, message: `${t('admin_add_product_description_required')}` }]}
                        style={{ width: '100%' }}
                    >
                        <TextArea
                            rows={5}
                            placeholder={t('admin_add_product_description_placeholder')}
                            maxLength={200}
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            title: `${t('admin_product_prices_label')}`,
            content: (
                <>
                    <Form.Item
                        name='sellingPrice'
                        label={t('admin_product_selling_price_label_input')}
                        rules={[{ required: true, message: `${t('admin_add_product_selling_price_required')}` }]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            type='number'
                            size='large'
                            placeholder={t('admin_add_product_selling_price_placeholder')}
                        />
                    </Form.Item>
                    <Form.Item
                        name='promotionPrice'
                        label={t('admin_product_promotion_price_label_input')}
                        rules={[{ required: true, message: `${t('admin_add_product_promotion_price_required')}` }]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            type='number'
                            size='large'
                            placeholder={t('admin_add_product_promotion_price_placeholder')}
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            title: `${t('admin_product_variants_label')}`,
            content: (
                <Form.List name='sizes'>
                    {(fields, { add, remove }) => (
                        <>
                            <BaseButton
                                disabled={fields.length > 3}
                                className={cx('buttonAdd')}
                                styleButton={ButtonStyleEnum.PRIMARY}
                                nameButton={t('admin_product_add_variant_label')}
                                onClick={() => add()}
                            />
                            <div className={cx('listAddVariant')}>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} className={cx('itemAddVariant')}>
                                        <Col span={22}>
                                            <Row>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'supplierImage']}
                                                    className={cx('uploadFormAddProduct')}
                                                >
                                                    <Upload
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
                                                </Form.Item>
                                            </Row>
                                            <Row justify={'space-between'}>
                                                <Col span={11}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'productSize']}
                                                        label={
                                                            <label
                                                                className={cx('labelAddProduct')}
                                                                htmlFor='productSize'
                                                            >
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
                                                        <Select
                                                            showSearch
                                                            size='large'
                                                            id='productSize'
                                                            placeholder={t('admin_add_product_size_placeholder')}
                                                            optionFilterProp='label'
                                                            onChange={handleGetInput}
                                                            filterOption={false}
                                                            onSearch={onSearch}
                                                            options={[
                                                                {
                                                                    value: 'jack',
                                                                    label: 'Jack',
                                                                },
                                                                {
                                                                    value: 'lucy',
                                                                    label: 'Lucy',
                                                                },
                                                                {
                                                                    value: 'tom',
                                                                    label: 'Tom',
                                                                },
                                                            ]}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={11}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'storeQuantity']}
                                                        label={
                                                            <label
                                                                className={cx('labelAddProduct')}
                                                                htmlFor='storeQuantity'
                                                            >
                                                                {t('admin_product_store_quantity_label_input')}
                                                            </label>
                                                        }
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: `${t(
                                                                    'admin_add_product_store_quantity_required'
                                                                )}`,
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            size='large'
                                                            id='storeQuantity'
                                                            type='text'
                                                            placeholder={t(
                                                                'admin_add_product_store_quantity_placeholder'
                                                            )}
                                                            title={t('admin_product_store_quantity_label_input')}
                                                            onChange={handleGetInput}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row justify={'space-between'}>
                                                <Col span={11}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'productColor']}
                                                        label={
                                                            <label
                                                                className={cx('labelAddProduct')}
                                                                htmlFor='productColor'
                                                            >
                                                                {t('admin_product_color_label_input')}
                                                            </label>
                                                        }
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: `${t('admin_add_product_color_required')}`,
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            showSearch
                                                            size='large'
                                                            id='productColor'
                                                            placeholder={t('admin_add_product_color_placeholder')}
                                                            optionFilterProp='label'
                                                            onChange={handleGetInput}
                                                            onSearch={onSearch}
                                                            filterOption={false}
                                                            options={[
                                                                {
                                                                    value: 'jack',
                                                                    label: 'Jack',
                                                                },
                                                                {
                                                                    value: 'lucy',
                                                                    label: 'Lucy',
                                                                },
                                                                {
                                                                    value: 'tom',
                                                                    label: 'Tom',
                                                                },
                                                            ]}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={11}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'sellingQuantity']}
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
                                                            size='large'
                                                            id='sellingQuantity'
                                                            type='text'
                                                            placeholder={t(
                                                                'admin_add_product_promotion_price_placeholder'
                                                            )}
                                                            title={t('admin_add_product_selling_quantity_placeholder')}
                                                            onChange={handleGetInput}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <BaseButton
                                            styleButton={ButtonStyleEnum.TEXT}
                                            className={cx('styleButton')}
                                            prevIcon={icons.deleteIcon}
                                            onClick={() => remove(name)}
                                        />
                                    </Row>
                                ))}
                            </div>
                        </>
                    )}
                </Form.List>
            ),
        },
    ];

    const handleGetInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {};

    function onChangeSelect(value: string) {
        console.log(`selected ${value}`);
    }

    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    function onSearchCategory(value: string) {
        if (!value) return;

        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(() => {
            dispatch(
                getCategoryThunk({
                    search: value,
                })
            )
                .unwrap()
                .then((response) => {
                    if (response) {
                        setOptionCategory(response);
                    }
                })
                .catch((error) => {
                    message.error(error?.message);
                });
        }, 500);
    }

    function onSearchSupplierCode(value: string) {
        if (!value) return;

        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(() => {
            dispatch(
                getSupplierThunk({
                    search: value,
                })
            )
                .unwrap()
                .then((response) => {
                    if (response) {
                        setOptionSupplierCode(response);
                    }
                })
                .catch((error) => {
                    message.error(error?.message);
                })
                .finally(() => {});
        }, 500);
    }

    function onSearch(value: string) {
        console.log(`selected ${value}`);
    }

    const handleClear = async () => {};

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

    const nextStep = async () => {
        try {
            // await form.validateFields();
            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleAddProduct = async () => {
        try {
            await form.validateFields();
            onCancel();
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };
    //#endregion Handle Function

    return (
        <Modal
            title={<div className={cx('modalTitle')}>{t('admin_product_new_product_title')}</div>}
            className={cx('modalAddProduct')}
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
                                nameButton='Submit'
                                styleButton={ButtonStyleEnum.PRIMARY}
                                onClick={handleAddProduct}
                            />
                        )}
                    </div>
                </div>
            }
            centered
            open={isShowModal}
            onCancel={onCancel}
        >
            <Steps current={currentStep} style={{ marginBottom: 24 }}>
                {steps.map((step) => (
                    <Step key={step.title} title={step.title} />
                ))}
            </Steps>
            <Form
                layout='vertical'
                form={form}
                initialValues={{ sizes: [{}] }}
                className={cx('formAddProduct')}
                onFinish={handleAddProduct}
            >
                {steps[currentStep].content}
            </Form>
        </Modal>
    );
};

export default FormAddProduct;
