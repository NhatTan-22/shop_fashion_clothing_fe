// Libs
import classNames from 'classnames/bind';
import { Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
import { convertTypeSupplier } from '~/utils/constants/helper';
// Styles, Images, icons
import { icons } from '~/assets';
import styles from './DetailSupplier.module.scss';
import { baseURL } from '~/utils/constants/env';

type Props = {
    openDrawerDetail?: boolean;
    setOpenDrawerDetail: React.Dispatch<React.SetStateAction<boolean>>;
    dataSupplier?: ISupplier;
};

const cx = classNames.bind(styles);

const DetailSupplier = (props: Props) => {
    //#region Destructuring Props
    const { openDrawerDetail, setOpenDrawerDetail, dataSupplier } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const typeData = dataSupplier?.isTaking ? convertTypeSupplier(dataSupplier.isTaking[0]) : null;
    //#endregion Handle Function

    return (
        <div id='drawerDetailComponent' className={cx('mainDrawerDetail')}>
            <Drawer
                onClose={() => setOpenDrawerDetail(!openDrawerDetail)}
                open={openDrawerDetail}
                title={<div className={cx('titleDrawer')}>{dataSupplier?.supplierName ?? '--'}</div>}
                width={400}
                // Delete
                footer={
                    <BaseButton
                        styleButton={ButtonStyleEnum.PRIMARY_RED}
                        nameButton={t('common_delete')}
                        className={cx('styleButton')}
                        prevIcon={icons.deleteIcon}
                    />
                }
            >
                <ul>
                    <li>
                        <img
                            src={`${baseURL}/${dataSupplier?.supplierImage}`}
                            alt={dataSupplier?.supplierName}
                            className={cx('imageDrawer')}
                        />
                    </li>
                    <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>
                                <img src={icons.emailIcon} alt='' /> {t('admin_supplier_email_label')}
                            </span>
                            <span>{dataSupplier?.supplierEmail ?? '--'}</span>
                        </div>
                    </li>
                    <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>
                                <img src={icons.phoneIcon} alt='' /> {t('admin_supplier_contact_phone_label')}
                            </span>
                            <span>{dataSupplier?.supplierPhone ?? '--'}</span>
                        </div>
                    </li>
                    <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>
                                <img src={icons.addressIcon} alt='' /> {t('admin_supplier_address_label')}
                            </span>
                            <span>{dataSupplier?.supplierAddress ?? '--'}</span>
                        </div>
                    </li>
                    <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>{t('admin_supplier_code_product_label')}</span>
                            <span>{dataSupplier?.supplierCode ?? '--'}</span>
                        </div>
                    </li>
                    <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>{t('supplier_type_label')}</span>
                            <div className={cx(typeData?.className)}>{typeData?.text || 'No data'}</div>
                        </div>
                    </li>
                    <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>{t('supplier_quantity_imported_label')}</span>
                            <span>{dataSupplier?.quantityImported ?? '--'}</span>
                        </div>
                    </li>
                </ul>
            </Drawer>
        </div>
    );
};

export default DetailSupplier;
