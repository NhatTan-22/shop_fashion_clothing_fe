// Libs
import classNames from 'classnames/bind';
import {
    Avatar,
    Button,
    Dropdown,
    Empty,
    Form,
    GetProp,
    Image,
    Input,
    message,
    Pagination,
    Row,
    Table,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { FormInstance, useForm } from 'antd/es/form/Form';
import { useContext, useEffect, useState } from 'react';
import { UploadChangeParam } from 'antd/es/upload';
// Components, Layouts, Pages
import { BaseButton, IconSVG } from '~/components';
// Others
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
import { renderFormatValue } from '~/utils/constants/helper';
import { IPagination, IParamsPagination } from '~/utils/interfaces/common';
import { IAddCategory, ICategory } from '~/utils/interfaces/interfaceCategory';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { baseURL } from '~/utils/constants/env';
import { addCategoryThunk, getCategoryThunk } from '~/thunks/category/categoryThunk';
import { LoadingContext } from '~/context';
// Styles, Images, icons
import styles from './Category.module.scss';
import { icons } from '~/assets';
import { categoryActions } from '~/thunks/category/categorySlice';

type Props = {};

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

const Category = (props: Props) => {
    //#region Destructuring Props
    const {} = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const [form] = useForm<FormInstance>();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    const isRefreshTable = useAppSelector((state) => state.category.refreshTable);
    const columns: Columns<ICategory, DataType<ICategory>>[] = [
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
    //#endregion Selector

    //#region Declare State
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    const [addCategory, setAddCategory] = useState<IAddCategory>({
        name: '',
        image: '',
        description: '',
    });
    const [category, setCategory] = useState<ICategory[]>([]);
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
        loadingContext?.show();
        dispatch(getCategoryThunk(paramsPage))
            .unwrap()
            .then((response) => {
                if (response) {
                    const pagination = response?.pagination;
                    setCategory(response?.data);
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
                dispatch(categoryActions.resetRefreshTable());
            });
    }, [paramsPage, paramsPage.currentPage, isRefreshTable]);
    //#endregion Implement Hook

    //#region Handle Function
    async function handlePreview(file: UploadFile) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    }

    function handleChangeImage({ file }: UploadChangeParam<UploadFile<any>>): void {
        if (file.status === 'done') {
            setAddCategory((prev) => ({
                ...prev,
                image: file.response.url || file.originFileObj || null,
            }));
        }
    }

    function handleGetInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setAddCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleAddCategory() {
        try {
            await form.validateFields();
            const formData = new FormData();

            Object.entries(addCategory).forEach(([key, value]) => {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            loadingContext?.show();
            dispatch(addCategoryThunk(formData))
                .unwrap()
                .then((response) => {
                    message.success(response.message);
                    form.resetFields();
                    dispatch(categoryActions.setRefreshTableTrue());
                })
                .catch((error) => {
                    message.error(error.message);
                })
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
        <div id='categoryPage' className={cx('mainCategory')}>
            <div className={cx('contentAddCategory')}>
                <div className={cx('headerCategory')}>
                    <div>
                        <h1>{`${t('admin_category_add_title')}`}</h1>
                    </div>
                </div>
                <Form layout='vertical' form={form} initialValues={{}} onFinish={handleAddCategory}>
                    <div>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Form.Item>
                                <Upload
                                    name='image'
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
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                name='name'
                                label={t('admin_add_category_name_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_category_name_required')}` }]}
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
                                label={t('admin_add_category_description_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_product_description_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <TextArea
                                    name='description'
                                    rows={5}
                                    placeholder={t('admin_add_category_description_placeholder')}
                                    maxLength={255}
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

                            <Button size='large' type='primary' onClick={handleAddCategory}>
                                {`${t('common_submit')}`}
                            </Button>
                        </div>
                    </Row>
                </Form>
            </div>
            <div className={cx('contentCategory')}>
                <div className={cx('headerCategory')}>
                    <h1>{t('admin_category_title')}</h1>
                </div>

                <>
                    {category.length ? (
                        <div className={cx('bodyCategory')}>
                            <Table
                                rowKey={(record) => record.name}
                                bordered={false}
                                tableLayout='auto'
                                columns={columns}
                                dataSource={category}
                                pagination={false}
                                scroll={{ x: 400, y: 600 }}
                            />
                            <Pagination
                                className={cx('footerPagination')}
                                align='center'
                                pageSize={paramsPage.limitPage}
                                total={currentPage.lengthPage}
                                current={currentPage.currentPage}
                                showSizeChanger={false}
                                onChange={handleChangePage}
                            />
                        </div>
                    ) : (
                        <Empty className={cx('bodyEmptySupplier')} />
                    )}
                </>
            </div>
        </div>
    );
};

export default Category;
