// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import {
    Button,
    Empty,
    Form,
    FormInstance,
    GetProp,
    Image,
    Input,
    message,
    Pagination,
    Row,
    Select,
    Table,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useRef, useState } from 'react';
import { UploadChangeParam } from 'antd/es/upload';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { IAddBrand, IBrand } from '~/utils/interfaces/interfaceBrand';
import { COUNTRY_LIST } from '~/utils/constants/common';
import { useAppDispatch } from '~/redux/hooks';
import { searchSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { baseURL } from '~/utils/constants/env';
// Styles, Images, icons
import styles from './Brand.module.scss';

type Props = {};
const { TextArea } = Input;
const { Option } = Select;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const cx = classNames.bind(styles);

const Brand = (props: Props) => {
    //#region Destructuring Props
    const {} = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const [form] = useForm<FormInstance>();
    const dispatch = useAppDispatch();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    const [optionSupplier, setOptionSupplier] = useState([]);
    const [domain, setDomain] = useState<string>('.com');
    const [addBrand, setAddBrand] = useState<IAddBrand>({
        name: '',
        image: '',
        description: '',
        country: '',
        website: '',
        suppliers: [],
    });
    const [brand, setBrand] = useState<IBrand[]>([]);
    const [currentPage, setCurrentPage] = useState<IPagination>({
        lengthPage: 0,
        currentPage: 1,
    });
    const [paramsPage, setParamsPage] = useState<IParamsPagination>({
        currentPage: 1,
        limitPage: 10,
    });
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        getSearchSuppliers('');
    }, []);
    //#endregion Implement Hook

    //#region Handle Function
    function getSearchSuppliers(value: string) {
        dispatch(searchSupplierThunk({ search: value }))
            .unwrap()
            .then((response) => {
                if (response) {
                    setOptionSupplier(response);
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
            getSearchSuppliers(value);
        }, 500);
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
            setAddBrand((prevSupplier) => ({
                ...prevSupplier,
                logo: file.response?.url || file.originFileObj || null,
            }));
        }
    }

    function handleChangeSelect(value: string, key: string) {
        setAddBrand((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    const handleGetInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'website') {
            const fullUrl = `http://${value}${domain}`;
            setAddBrand((prev) => ({ ...prev, website: fullUrl }));
        } else {
            setAddBrand((prev) => ({ ...prev, [name]: value }));
        }
    };

    function handleAddBrand() {
        console.log(addBrand);
    }
    function handleClear() {
        form.resetFields();
    }

    const handleChangePage = (e: number) => {
        setParamsPage({ ...paramsPage, currentPage: e });
    };
    //#endregion Handle Function

    return (
        <div id='branPage' className={cx('mainBrand')}>
            <div className={cx('contentAddBrand')}>
                <div className={cx('headerAddBrand')}>
                    <h1>{t('admin_brand_add_title')}</h1>
                </div>
                <Form layout='vertical' form={form} initialValues={{ country: 'USA' }} onFinish={handleAddBrand}>
                    <div>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <Upload
                                    name='logo'
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
                        <Row>
                            <Form.Item
                                name='name'
                                label={t('admin_add_brand_name_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_brand_name_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    size='large'
                                    name='name'
                                    placeholder={t('admin_add_product_name_placeholder')}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                name='description'
                                label={t('admin_add_brand_description_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_product_description_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <TextArea
                                    name='description'
                                    rows={5}
                                    placeholder={t('admin_add_brand_description_placeholder')}
                                    maxLength={255}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                name='suppliers'
                                label={t('admin_add_brand_supplier_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_brand_supplier_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Select
                                    mode='multiple'
                                    showSearch
                                    style={{ width: '100%' }}
                                    size='large'
                                    placeholder={t('admin_add_brand_supplier_placeholder')}
                                    optionFilterProp='label'
                                    onChange={(value) => handleChangeSelect(value, 'suppliers')}
                                    onSearch={onSearchCategory}
                                    options={optionSupplier}
                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                name='country '
                                label={t('admin_add_brand_country_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_brand_country_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Select
                                    size='large'
                                    onChange={(value) => handleChangeSelect(value, 'country')}
                                    options={COUNTRY_LIST}
                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                name='website '
                                label={t('admin_add_brand_website_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_brand_website_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    size='large'
                                    name='website'
                                    placeholder={t('admin_add_brand_website_placeholder')}
                                    addonBefore='http://'
                                    addonAfter={
                                        <Select defaultValue={'.com'} onChange={(value) => setDomain(value)}>
                                            <Option value='.com'>.com</Option>
                                            <Option value='.jp'>.jp</Option>
                                            <Option value='.cn'>.cn</Option>
                                            <Option value='.org'>.org</Option>
                                        </Select>
                                    }
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Row>
                    </div>
                    <Row justify={'end'} style={{ display: 'flex', alignItems: 'end' }}>
                        <div className={cx('buttonHeader')}>
                            <BaseButton
                                styleButton={ButtonStyleEnum.TEXT}
                                onClick={handleClear}
                                nameButton={`${t('common_clear')}`}
                            />

                            <Button size='large' type='primary' onClick={handleAddBrand}>
                                {`${t('common_submit')}`}
                            </Button>
                        </div>
                    </Row>
                </Form>
            </div>
            <div className={cx('contentBrand')}>
                <div className={cx('headerBrand')}>
                    <h1>{t('admin_brand_title')}</h1>
                </div>

                <>
                    {/* {brand.length ? (
                        <div className={cx('bodyBrand')}>
                            <Table
                                bordered={false}
                                tableLayout='auto'
                                columns={columns}
                                dataSource={brand}
                                pagination={false}
                                scroll={{ x: 400, y: 390 }}
                            />
                            <Pagination
                                className={cx('footerPagination')}
                                align='center'
                                defaultCurrent={currentPage.currentPage}
                                total={currentPage.lengthPage}
                                showSizeChanger={false}
                                onChange={handleChangePage}
                            />
                        </div>
                    ) : ( */}
                    <Empty className={cx('bodyEmptyBrand')} />
                    {/* )} */}
                </>
            </div>
        </div>
    );
};

export default Brand;
