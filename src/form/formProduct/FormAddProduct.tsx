// Libs
import classNames from 'classnames/bind';
import {
    Button,
    Col,
    Flex,
    Form,
    GetProp,
    Image,
    Input,
    message,
    Modal,
    Row,
    Select,
    Steps,
    Tag,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormInstance, useForm } from 'antd/es/form/Form';
import { UploadChangeParam } from 'antd/es/upload';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { useAppDispatch } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { searchSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { searchCategoryThunk } from '~/thunks/category/categoryThunk';
import { addProductThunk } from '~/thunks/product/productThunk';
import { productActions } from '~/thunks/product/productSlice';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { IAddProduct } from '~/utils/interfaces/interfaceProduct';
import { baseURL } from '~/utils/constants/env';
// Styles, Images, icons
import styles from './FormAddProduct.module.scss';
import { icons } from '~/assets';

type Props = {
    isShowModal?: boolean;
    onCancel: () => void;
};

const { Step } = Steps;
const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

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

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    const [optionCategory, setOptionCategory] = useState([]);
    const [optionSupplier, setOptionSupplier] = useState([]);

    const [sizeInput, setSizeInput] = useState<string>('');
    const [colorInput, setColorInput] = useState<string>('');

    const [addProduct, setAddProduct] = useState<IAddProduct>({
        images: [],
        name: '',
        description: '',
        category: '',
        pricing: {
            price: 0,
            promotionPrice: 0,
            discountPercentage: 0,
        },
        stock: 0,
        sizes: [],
        colors: [],
        gender: '',
        brand: '',
        supplier: '',
    });
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        if (isShowModal) {
            getSearchCategories('');
            getSearchSuppliers('');
        }
    }, [isShowModal]);
    //#endregion Implement Hook

    //#region Handle Function
    const steps = [
        {
            title: `${t('admin_product_general_information_step_title')}`,
            content: (
                <>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
                            <Form.Item
                                name='name'
                                label={t('admin_product_name_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_product_name_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    size='large'
                                    name='name'
                                    placeholder={t('admin_add_product_name_placeholder')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item name='gender' label={t('admin_gender_label_select')}>
                                <Select
                                    style={{ width: '100%' }}
                                    size='large'
                                    placeholder={t('admin_add_product_category_placeholder')}
                                    optionFilterProp='label'
                                    defaultValue={'UNISEX'}
                                    onChange={(value) => handleChangeSelect(value, 'gender')}
                                    options={[
                                        { value: 'MALE', label: t('gender_male') },
                                        { value: 'FEMALE', label: t('gender_female') },
                                        { value: 'UNISEX', label: t('gender_unisex') },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
                            <Form.Item
                                name='category'
                                label={t('admin_product_category_label_select')}
                                rules={[{ required: true, message: `${t('admin_add_product_category_required')}` }]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    size='large'
                                    placeholder={t('admin_add_product_category_placeholder')}
                                    optionFilterProp='label'
                                    onChange={(value) => handleChangeSelect(value, 'category')}
                                    onSearch={onSearchCategory}
                                    options={optionCategory}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='supplier'
                                label={t('admin_supplier_name_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_select_supplier_name_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    size='large'
                                    placeholder={t('admin_add_select_supplier_name_placeholder')}
                                    optionFilterProp='label'
                                    onChange={(value) => handleChangeSelect(value, 'supplier')}
                                    onSearch={onSearchSupplierCode}
                                    options={optionSupplier}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ),
        },
        {
            title: `${t('admin_product_description_step_title')}`,
            content: (
                <>
                    <Row>
                        <Form.Item
                            name='description'
                            label={t('admin_product_description_label_input')}
                            rules={[{ required: true, message: `${t('admin_add_product_description_required')}` }]}
                            style={{ width: '100%' }}
                        >
                            <TextArea
                                name='description'
                                rows={5}
                                placeholder={t('admin_add_product_description_placeholder')}
                                maxLength={255}
                                onChange={handleGetInput}
                            />
                        </Form.Item>
                    </Row>
                    <Row>{/* Code React-Quill */}</Row>
                </>
            ),
        },
        {
            title: `${t('admin_product_pricing_step_title')}`,
            content: (
                <>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
                            <Form.Item
                                name='stock'
                                label={t('admin_product_stock_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_product_stock_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    type='number'
                                    size='large'
                                    name='stock'
                                    placeholder={t('admin_add_product_stock_placeholder')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='price'
                                label={t('admin_product_selling_price_label_input')}
                                rules={[
                                    { required: true, message: `${t('admin_add_product_selling_price_required')}` },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    type='number'
                                    size='large'
                                    name='price'
                                    placeholder={t('admin_add_product_selling_price_placeholder')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
                            <Form.Item
                                name='promotionPrice'
                                label={t('admin_product_promotion_price_label_input')}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    type='number'
                                    size='large'
                                    name='promotionPrice'
                                    placeholder={t('admin_add_product_promotion_price_placeholder')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='discountPercentage'
                                label={t('admin_product_discount_percentage_label_input')}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    type='number'
                                    size='large'
                                    name='discountPercentage'
                                    placeholder={t('admin_add_product_discount_percentage_placeholder')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ),
        },
        {
            title: `${t('admin_product_variants_step_title')}`,
            content: (
                <>
                    <Row style={{ justifyContent: 'center' }}>
                        <Form.Item name='images'>
                            <Upload
                                name='images'
                                className={cx('uploadFormAddProduct')}
                                action={`${baseURL}/public/images`}
                                listType='picture-card'
                                fileList={fileList}
                                customRequest={(options: any) => {
                                    options.onSuccess?.({}, options.file);
                                }}
                                maxCount={4}
                                multiple={true}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 4 ? null : (
                                    <button style={{ border: 0, background: 'none' }} type='button'>
                                        <div style={{ marginTop: 8 }}>{`+ Upload`}</div>
                                    </button>
                                )}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Form.Item>
                    </Row>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
                            <Form.Item
                                name='sizes'
                                label={
                                    <label className={cx('labelAddProduct')} htmlFor='sizes'>
                                        {t('admin_product_size_label_input')}
                                    </label>
                                }
                                style={{ width: '100%' }}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    name='sizes'
                                    size='large'
                                    type='text'
                                    value={sizeInput}
                                    onChange={handleGetInput}
                                    placeholder={t('admin_add_product_size_placeholder')}
                                    onPressEnter={() => handleInputConfirm('sizes')}
                                />
                            </Form.Item>
                            <Flex gap='4px 0' wrap>
                                {addProduct.sizes.map((size, index) => (
                                    <Tag
                                        key={`${index}-${size}`}
                                        bordered={false}
                                        closable
                                        onClose={(e) => {
                                            e.preventDefault();
                                            const remove = addProduct.sizes.filter((sizeFilter) => sizeFilter !== size);
                                            setAddProduct((prev) => ({ ...prev, sizes: remove }));
                                        }}
                                    >
                                        {`${size}`}
                                    </Tag>
                                ))}
                            </Flex>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='colors'
                                label={
                                    <label className={cx('labelAddProduct')} htmlFor='colors'>
                                        {t('admin_product_color_label_input')}
                                    </label>
                                }
                                style={{ width: '100%' }}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    size='large'
                                    type='text'
                                    name='colors'
                                    value={colorInput}
                                    onChange={handleGetInput}
                                    placeholder={t('admin_add_product_color_placeholder')}
                                    onPressEnter={() => handleInputConfirm('colors')}
                                />
                            </Form.Item>
                            <Flex gap='4px 0' wrap>
                                {addProduct.colors.map((color, index) => (
                                    <Tag
                                        key={`${index}-${color}`}
                                        color={`${color}`}
                                        bordered={false}
                                        closable
                                        onClose={(e) => {
                                            e.preventDefault();
                                            const remove = addProduct.colors.filter(
                                                (colorFilter) => colorFilter !== color
                                            );
                                            setAddProduct((prev) => ({ ...prev, colors: remove }));
                                        }}
                                    >
                                        {`${color}`}
                                    </Tag>
                                ))}
                            </Flex>
                        </Col>
                    </Row>
                </>
            ),
        },
    ];

    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const nextStep = async () => {
        try {
            // await form.validateFields();
            setCurrentStep(currentStep + 1);
        } catch (error) {
            message.error(String(error));
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    function getSearchCategories(value: string) {
        dispatch(
            searchCategoryThunk({
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
    }

    function getSearchSuppliers(value: string) {
        dispatch(
            searchSupplierThunk({
                search: value,
            })
        )
            .unwrap()
            .then((response) => {
                if (response) {
                    setOptionSupplier(response);
                }
            })
            .catch((error) => {
                message.error(error?.message);
            })
            .finally(() => {});
    }

    function onSearchCategory(value: string) {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(() => {
            getSearchCategories(value);
        }, 500);
    }

    function onSearchSupplierCode(value: string) {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(() => {
            getSearchSuppliers(value);
        }, 500);
    }

    function handleChangeSelect(value: string, field: 'category' | 'supplier' | 'gender') {
        setAddProduct((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleGetInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        const numericValue = Number(value);
        if (name === 'sizes') {
            setSizeInput(value);
        } else if (name === 'colors') {
            setColorInput(value);
        } else if (['price', 'promotionPrice', 'discountPercentage'].includes(name)) {
            setAddProduct((prev) => ({
                ...prev,
                pricing: {
                    ...prev.pricing,
                    [name]: numericValue,
                },
            }));
        } else {
            setAddProduct((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    function handleChange(info: UploadChangeParam<UploadFile<any>>) {
        const newFileList = info.fileList;
        setFileList(newFileList);

        const imageUrls = newFileList
            .filter((file) => file.status === 'done' || file.originFileObj)
            .map((file) => (file.url ? file.url : URL.createObjectURL(file.originFileObj!)));

        setAddProduct((prev) => ({
            ...prev,
            images: imageUrls,
        }));
    }

    async function handlePreview(file: UploadFile) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    }

    function handleInputConfirm(type: 'sizes' | 'colors') {
        if (type === 'sizes' && sizeInput && !addProduct.sizes.includes(sizeInput)) {
            setAddProduct((prev) => ({
                ...prev,
                sizes: [...prev.sizes, sizeInput],
            }));
            setSizeInput('');
        }
        if (type === 'colors' && colorInput && !addProduct.colors.includes(colorInput)) {
            setAddProduct((prev) => ({
                ...prev,
                colors: [...prev.colors, colorInput],
            }));
            setColorInput('');
        }
    }

    const handleClear = async () => {
        form.resetFields();
    };

    const handleAddProduct = async () => {
        try {
            await form.validateFields();
            const formData = new FormData();

            Object.entries(addProduct).forEach(([key, value]) => {
                if (key === 'images') {
                    fileList.forEach((file, index) => {
                        if (file.originFileObj) {
                            formData.append(`images`, file.originFileObj);
                        }
                    });
                } else if (key === 'pricing') {
                    formData.append('pricing', JSON.stringify(value));
                } else if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            loadingContext?.show();

            dispatch(addProductThunk(formData))
                .unwrap()
                .then((response) => {
                    message.success(response.message);
                    form.resetFields();
                    setFileList([]);
                    dispatch(productActions.setRefreshTableTrue());
                })
                .catch((error) => {
                    message.error(error.message);
                })
                .finally(() => {
                    loadingContext?.hide();
                    onCancel();
                });
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error(String(error));
            }
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
                        {currentStep > 0 && (
                            <Button size='large' onClick={prevStep}>{`${t('common_previous')}`}</Button>
                        )}
                        {currentStep < steps.length - 1 && (
                            <Button size='large' type='primary' onClick={nextStep}>
                                {`${t('common_next')}`}
                            </Button>
                        )}
                        {currentStep === steps.length - 1 && (
                            <Button size='large' type='primary' onClick={handleAddProduct}>
                                {`${t('common_submit')}`}
                            </Button>
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
            <Form layout='vertical' form={form} className={cx('formAddProduct')} onFinish={handleAddProduct}>
                {steps[currentStep].content}
            </Form>
        </Modal>
    );
};

export default FormAddProduct;
