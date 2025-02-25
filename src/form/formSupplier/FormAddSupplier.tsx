// Libs
import classNames from 'classnames/bind';
import {
    Col,
    DatePicker,
    Form,
    GetProp,
    Image,
    Input,
    message,
    Modal,
    Row,
    Select,
    Steps,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import { useContext, useEffect, useRef, useState } from 'react';
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
import { baseURL } from '~/utils/constants/env';
import { searchCategoryThunk } from '~/thunks/category/categoryThunk';

type Props = {
    isShowModal?: boolean;
    onClose: () => void;
};

const { Step } = Steps;
// const { Option } = Select;
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
    const [supplier, setSupplier] = useState<IAddSupplier>({
        supplierName: '',
        contactPerson: '',
        image: '',
        email: '',
        phone: '',
        address: '',
        categories: [],
        orderQuantity: 0,
        importPrice: 0,
        expectedArrivalDate: new Date(),
        lastRestockDate: new Date(),
    });
    const [currentStep, setCurrentStep] = useState(0);

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    const [optionCategory, setOptionCategory] = useState([]);
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        if (isShowModal) {
            getSearchCategories('');
        }
    }, [isShowModal]);
    //#endregion Implement Hook

    //#region Handle Function
    const steps = [
        {
            title: `${t('admin_supplier_information_label')}`,
            content: (
                <>
                    <Row style={{ justifyContent: 'center' }}>
                        <div>
                            <Upload
                                name='image'
                                className={cx('uploadFormAddSupplier')}
                                listType='picture-circle'
                                customRequest={(options: any) => {
                                    options.onSuccess?.({}, options.file);
                                }}
                                action={`${baseURL}/public/images`}
                                onChange={handleChangeImage}
                                onPreview={handlePreview}
                                maxCount={1}
                            >
                                <button style={{ border: 0, background: 'none' }} type='button'>
                                    <div style={{ marginTop: 8 }}>{`+ Upload`}</div>
                                </button>
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
                        </div>
                    </Row>

                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col span={11}>
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
                                    id='supplierName'
                                    name='supplierName'
                                    type='text'
                                    size='large'
                                    autoFocus
                                    placeholder={t('admin_add_supplier_name_placeholder')}
                                    onChange={(e) => handleChange(e.target.value, 'supplierName')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='contactPerson'
                                label={
                                    <label className={cx('labelAddSupplier')} htmlFor='contactPerson'>
                                        {t('admin_supplier_contact_person_label_input')}
                                    </label>
                                }
                                rules={[
                                    { required: true, message: `${t('admin_add_supplier_contact_person_required')}` },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    id='contactPerson'
                                    name='contactPerson'
                                    type='text'
                                    size='large'
                                    placeholder={t('admin_add_supplier_contact_person_placeholder')}
                                    onChange={(e) => handleChange(e.target.value, 'contactPerson')}
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
                                    onChange={(e) => handleChange(e.target.value, 'phone')}
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
                                    onChange={(e) => handleChange(e.target.value, 'email')}
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
                            onChange={(e) => handleChange(e.target.value, 'address')}
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            title: `${t('admin_import_product_information_label')}`,
            content: (
                <>
                    <Row justify={'space-between'}>
                        <Col span={11}>
                            <Form.Item
                                name='category'
                                label={t('admin_product_category_label_select')}
                                rules={[{ required: true, message: `${t('admin_add_product_category_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Select
                                    mode='multiple'
                                    showSearch
                                    style={{ width: '100%' }}
                                    size='large'
                                    placeholder={t('admin_add_product_category_placeholder')}
                                    optionFilterProp='label'
                                    onChange={(value) => handleChangeSelect(value, 'categories')}
                                    onSearch={onSearchCategory}
                                    options={optionCategory}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item name='date' label={t('admin_supplier_date_label_input')}>
                                <DatePicker
                                    style={{ width: '90%' }}
                                    size='large'
                                    disabledDate={disabledDate}
                                    onChange={(date) => {
                                        handleChangeDate(date || null, 'lastRestockDate');
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item
                            name='orderQuantity'
                            label={
                                <label className={cx('labelAddSupplier')} htmlFor='orderQuantity'>
                                    {t('admin_supplier_order_quantity_label_input')}
                                </label>
                            }
                            rules={[{ required: true, message: `${t('admin_add_supplier_order_quantity_required')}` }]}
                            style={{ width: '100%' }}
                        >
                            <Input
                                id='orderQuantity'
                                name='orderQuantity'
                                type='number'
                                size='large'
                                min={0}
                                placeholder={t('admin_add_supplier_order_quantity_placeholder')}
                                onChange={(e) => handleChange(e.target.value, 'orderQuantity')}
                            />
                        </Form.Item>
                    </Row>
                    <Row>
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
                                onChange={(e) => handleChange(e.target.value, 'importPrice')}
                            />
                        </Form.Item>
                    </Row>
                </>
            ),
        },
    ];

    function getSearchCategories(value: string) {
        dispatch(searchCategoryThunk({ search: value }))
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

    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    function onSearchCategory(value: string) {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(() => {
            getSearchCategories(value);
        }, 500);
    }

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

    function disabledDate(current: Dayjs) {
        return current && current < dayjs().startOf('day');
    }

    async function handlePreview(file: UploadFile) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    }

    function handleChangeImage({ file }: UploadChangeParam<UploadFile<any>>): void {
        if (file.status === 'done') {
            setSupplier((prevSupplier) => ({
                ...prevSupplier,
                image: file.response?.url || file.originFileObj || null,
            }));
        }
    }

    function handleChangeSelect(value: string[], field: 'categories') {
        setSupplier((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleChangeDate(value: Dayjs, field: keyof IAddSupplier) {
        setSupplier((prev) => ({
            ...prev,
            expectedArrivalDate: dayjs().toISOString(),
            [field]: value.format('YYYY-MM-DDTHH:mm:ss'),
        }));
    }

    function handleChange(value: string | string[] | null, field: keyof IAddSupplier) {
        setSupplier((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    const handleAddSupplier = async () => {
        try {
            await form.validateFields();
            const formData = new FormData();

            Object.entries(supplier).forEach(([key, value]) => {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else if (key === 'categories' && Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
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
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error(String(error));
            }
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
