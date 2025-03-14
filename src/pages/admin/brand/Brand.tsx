// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import {
    Avatar,
    Button,
    Dropdown,
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
import { useContext, useEffect, useRef, useState } from 'react';
import { UploadChangeParam } from 'antd/es/upload';
// Components, Layouts, Pages
import { BaseButton, IconSVG } from '~/components';
// Others
import { IAddBrand, IBrand } from '~/utils/interfaces/interfaceBrand';
import { COUNTRY_LIST } from '~/utils/constants/common';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { searchSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { baseURL } from '~/utils/constants/env';
import { addBrandThunk, getBrandThunk } from '~/thunks/brand/brandThunk';
import { LoadingContext } from '~/context';
import { brandActions } from '~/thunks/brand/brandSlice';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { renderFormatValue } from '~/utils/constants/helper';
// Styles, Images, icons
import styles from './Brand.module.scss';
import { icons } from '~/assets';

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
    const {} = props;

    const { t } = useTranslation();
    const [form] = useForm<FormInstance>();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);

    const isRefreshTable = useAppSelector((state) => state.brand.refreshTable);
    const columns: Columns<IBrand, DataType<IBrand>>[] = [
        {
            title: t('admin_category_logo_label_table'),
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => {
                if (record) return <Avatar src={`${baseURL}/${record.image}`} alt={record.name} />;
            },
        },
        {
            title: t('admin_category_name_label_table'),
            dataIndex: 'name',
            key: 'name',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('admin_category_description_label_table'),
            dataIndex: 'description',
            key: 'description',
            render: (_, record) => {
                return <p>{`${record.description ?? renderFormatValue(record.description)}`}</p>;
            },
        },
        {
            title: t('admin_category_name_label_table'),
            dataIndex: 'country',
            key: 'country',
            render: (text, _) => {
                return <p>{`${text ?? renderFormatValue(text)}`}</p>;
            },
        },
        {
            title: t('admin_category_name_label_table'),
            dataIndex: 'website',
            key: 'website',
            render: (text, _) => {
                return <a href={`${text ?? renderFormatValue(text)}`}>{`${text ?? renderFormatValue(text)}`}</a>;
            },
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                if (record) {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: `common_detail_${record._id}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_detail')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.eyeIcon} />,
                                        // onClick: () => handleEditSupplier(record),
                                    },
                                    {
                                        key: `common_edit_${record._id}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_edit')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.editIcon} />,
                                        // onClick: () => handleEditSupplier(record),
                                    },
                                    {
                                        key: `common_delete_${record._id}`,
                                        label: <p style={{ marginLeft: '2px' }}>{`${t('common_delete')}`}</p>,
                                        icon: <IconSVG IconComponent={icons.deleteIcon} />,
                                        // onClick: () => handleDeleteSupplier(record),
                                    },
                                ],
                            }}
                            trigger={['click']}
                        >
                            <div>
                                <IconSVG IconComponent={icons.dotVerticalIcon} />
                            </div>
                        </Dropdown>
                    );
                }
            },
        },
    ];

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

    useEffect(() => {
        getSearchSuppliers('');
    }, []);

    useEffect(() => {
        loadingContext?.show();
        dispatch(getBrandThunk(paramsPage))
            .unwrap()
            .then((response) => {
                if (response) {
                    const pagination = response?.pagination;
                    setBrand(response?.data);
                    setCurrentPage({
                        lengthPage: pagination.lengthPage,
                        currentPage: pagination.currentPage,
                    });
                }
            })
            .catch((error) => {
                message.error(error?.message);
            })
            .finally(() => {
                loadingContext?.hide();
                dispatch(brandActions.resetRefreshTable());
            });
    }, [paramsPage, paramsPage.currentPage, isRefreshTable]);

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
                image: file.response?.url || file.originFileObj || null,
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

    async function handleAddBrand() {
        try {
            await form.validateFields();
            const formData = new FormData();

            Object.entries(addBrand).forEach(([key, value]) => {
                if (key === 'image' && value !== null) {
                    formData.append(key, value);
                } else if (key === 'suppliers' && Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            loadingContext?.show();
            dispatch(addBrandThunk(formData))
                .unwrap()
                .then((response) => {
                    message.success(response.message);
                    form.resetFields();
                    dispatch(brandActions.setRefreshTableTrue());
                })
                .catch(() => {})
                .finally(() => {
                    loadingContext?.hide();
                });
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error(String(error));
            }
        }
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
                <Form
                    layout='vertical'
                    style={{ padding: '0 40px' }}
                    form={form}
                    initialValues={{ country: 'USA' }}
                    onFinish={handleAddBrand}
                >
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
                                    addonBefore='https://'
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
                    {brand.length ? (
                        <div className={cx('bodyBrand')}>
                            <Table
                                rowKey={(record) => record.name}
                                bordered={false}
                                tableLayout='fixed'
                                columns={columns}
                                dataSource={brand}
                                pagination={false}
                                scroll={{ x: 400, y: 600 }}
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
                    ) : (
                        <Empty className={cx('bodyEmptyBrand')} />
                    )}
                </>
            </div>
        </div>
    );
};

export default Brand;
