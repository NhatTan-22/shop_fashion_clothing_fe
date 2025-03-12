// Libs
import classNames from 'classnames/bind';
import { Drawer, Form, message } from 'antd';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { LoadingContext } from '~/context';
import { useAppDispatch } from '~/redux/hooks';
import { deleteSupplierThunk } from '~/thunks/supplier/supplierThunk';
import { supplierActions } from '~/thunks/supplier/supplierSlice';
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './DetailSupplier.module.scss';

type Props = {
    openDrawerDetail?: boolean;
    setOpenDrawerDetail: React.Dispatch<React.SetStateAction<boolean>>;
    slug: string;
};

const cx = classNames.bind(styles);

const DetailSupplier = (props: Props) => {
    //#region Destructuring Props
    const { openDrawerDetail, setOpenDrawerDetail, slug } = props;
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
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {}, [slug]);
    //#endregion Implement Hook

    //#region Handle Function
    const handleUpdateSupplier = (_id: string) => {
        loadingContext?.show();
        dispatch(deleteSupplierThunk(_id))
            .unwrap()
            .then((response) => {
                if (response) {
                    setOpenDrawerDetail(false);
                    message.success(response.message);
                    dispatch(supplierActions.setRefreshTableTrue());
                }
            })
            .catch((error) => {
                message.error(error.message);
            })
            .finally(() => {
                loadingContext?.hide();
            });
    };
    //#endregion Handle Function

    return (
        <div id='drawerDetailComponent' className={cx('mainDrawerDetail')}>
            <Drawer
                onClose={() => setOpenDrawerDetail(!openDrawerDetail)}
                open={openDrawerDetail}
                // title={<div className={cx('titleDrawer')}>{dataSupplier?.supplierName ?? '--'}</div>}
                width={600}
                footer={
                    <BaseButton
                        styleButton={ButtonStyleEnum.PRIMARY}
                        nameButton={t('common_update')}
                        className={cx('styleButton')}
                    />
                }
            >
                {/* <Form
                    layout='vertical'
                    form={form}
                    initialValues={{ sizes: [{}] }}
                    name='addSupplier'
                    className={cx('formAddSupplier')}
                    onFinish={handleUpdateSupplier}
                > */}
                <ul>
                    {/* <li>
                            <img
                                src={`${baseURL}/${dataSupplier?.image}`}
                                alt={dataSupplier?.supplierName && ''}
                                className={cx('imageDrawer')}
                            />
                        </li>
                        <li>
                            <div className={cx('itemDrawer')}>
                                <span className={cx('titleItemDrawer')}>
                                    <IconSVG IconComponent={icons.emailIcon} /> {t('admin_supplier_email_label')}
                                </span>
                                <span>{dataSupplier?.email ?? '--'}</span>
                            </div>
                        </li>
                        <li>
                            <div className={cx('itemDrawer')}>
                                <span className={cx('titleItemDrawer')}>
                                    <IconSVG IconComponent={icons.phoneIcon} />{' '}
                                    {t('admin_supplier_contact_phone_label')}
                                </span>
                                <span>{dataSupplier?.phone ?? '--'}</span>
                            </div>
                        </li>
                        <li>
                            <div className={cx('itemDrawer')}>
                                <span className={cx('titleItemDrawer')}>
                                    <IconSVG IconComponent={icons.addressIcon} /> {t('admin_supplier_address_label')}
                                </span>
                                <span>{dataSupplier?.address ?? '--'}</span>
                            </div>
                        </li>
                        <li>
                            <div className={cx('itemDrawer')}>
                                <span className={cx('titleItemDrawer')}>{t('admin_supplier_code_product_label')}</span>
                                <span>{dataSupplier?.contactPerson ?? '--'}</span>
                            </div>
                        </li>
                        <li>
                            <div className={cx('itemDrawer')}>
                                <span className={cx('titleItemDrawer')}>{t('supplier_type_label')}</span>
                                <div>{dataSupplier?.restockStatus || 'No data'}</div>
                            </div>
                        </li> */}
                    {/* <li>
                            <div className={cx('itemDrawer')}>
                                <span className={cx('titleItemDrawer')}>{t('supplier_quantity_imported_label')}</span>
                                <span>{dataSupplier?.orderQuantity ?? '--'}</span>
                            </div>
                        </li> */}
                </ul>
                {/* </Form> */}
            </Drawer>
        </div>
    );
};

export default DetailSupplier;
