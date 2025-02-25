// Libs
import classNames from 'classnames/bind';
import {
    Button,
    Col,
    Empty,
    Form,
    GetProp,
    Image,
    Input,
    Pagination,
    Row,
    Table,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { FormInstance, useForm } from 'antd/es/form/Form';
import { useState } from 'react';
// Components, Layouts, Pages
// Others
import { IAddCategory } from '~/utils/interfaces/interfaceCategory';
// Styles, Images, icons
import styles from './Category.module.scss';
import { baseURL } from '~/utils/constants/env';
import { UploadChangeParam } from 'antd/es/upload';
import { BaseButton } from '~/components';
import { ButtonStyleEnum } from '~/utils/constants/enum';

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
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    const [category, setCategory] = useState<IAddCategory>({
        name: '',
        logo: '',
        description: '',
    });
    //#endregion Declare State

    //#region Implement Hook

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
            setCategory((prevSupplier) => ({
                ...prevSupplier,
                logo: file.response?.url || file.originFileObj || null,
            }));
        }
    }

    function handleGetInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleAddCategory() {}
    function handleClear() {}
    //#endregion Handle Function

    return (
        <div id='categoryPage' className={cx('mainCategory')}>
            <div className={cx('contentAddCategory')}>
                <div className={cx('headerCategory')}>
                    <div>
                        <h1>{`${t('admin_category_add_title')}`}</h1>
                    </div>
                </div>
                <Form layout='vertical' form={form} onFinish={handleAddCategory}>
                    <Row style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        <Col span={4} style={{ display: 'flex', justifyContent: 'end' }}>
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
                        </Col>
                        <Col span={8}>
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
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name='description'
                                label={t('admin_category_description_label_input')}
                                rules={[{ required: true, message: `${t('admin_add_product_description_required')}` }]}
                                style={{ width: '100%' }}
                            >
                                <TextArea
                                    name='description'
                                    rows={3}
                                    placeholder={t('admin_add_category_description_placeholder')}
                                    maxLength={255}
                                    onChange={handleGetInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className={cx('contentCategory')}>
                <div className={cx('headerCategory')}>
                    <h1>{t('admin_category_title')}</h1>
                </div>

                <>
                    {/* {data.length ? (
                        <div className={cx('bodyInventory')}>
                            <Table
                                bordered={false}
                                tableLayout='auto'
                                columns={columns}
                                dataSource={data}
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
                    <Empty className={cx('bodyEmptySupplier')} />
                    {/* )} */}
                </>
            </div>
        </div>
    );
};

export default Category;
