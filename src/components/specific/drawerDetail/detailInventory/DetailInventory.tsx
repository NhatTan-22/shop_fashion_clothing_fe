// Libs
import classNames from 'classnames/bind';
import { Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { BaseButton, IconSVG } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { IProduct } from '~/utils/interfaces/interfaceProduct';
// Styles, Images, icons
import { icons } from '~/assets';
import styles from './DetailInventory.module.scss';

type Props = {
    openDrawerDetail?: boolean;
    setOpenDrawerDetail: React.Dispatch<React.SetStateAction<boolean>>;
    dataProduct?: IProduct;
};

const cx = classNames.bind(styles);

const DetailInventory = (props: Props) => {
    //#region Destructuring Props
    const { openDrawerDetail, setOpenDrawerDetail, dataProduct } = props;
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
    //#endregion Handle Function

    return (
        <div id='drawerDetailComponent' className={cx('mainDrawerDetail')}>
            <Drawer
                onClose={() => setOpenDrawerDetail(!openDrawerDetail)}
                open={openDrawerDetail}
                title={<div className={cx('titleDrawer')}>{dataProduct?.name ?? '--'}</div>}
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
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>
                                <IconSVG IconComponent={icons.emailIcon} />
                            </span>
                            <span>{dataProduct?.description ?? '--'}</span>
                        </div>
                    </li>
                    {/* <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>
                                <IconSVG IconComponent={icons.phoneIcon} />
                            </span>
                            <span>{dataProduct?.phone ?? '--'}</span>
                        </div>
                    </li> */}
                    <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>
                                <IconSVG IconComponent={icons.addressIcon} />
                            </span>
                            <span>{dataProduct?.status ?? '--'}</span>
                        </div>
                    </li>
                    <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>{t('admin_supplier_code_product_label')}</span>
                            <span>{dataProduct?.slug ?? '--'}</span>
                        </div>
                    </li>
                    {/* <li>
                        <div className={cx('itemDrawer')}>
                            <span className={cx('titleItemDrawer')}>{t('supplier_quantity_imported_label')}</span>
                            <span>{dataProduct?.importQuantity ?? '--'}</span>
                        </div>
                    </li> */}
                </ul>
            </Drawer>
        </div>
    );
};

export default DetailInventory;
