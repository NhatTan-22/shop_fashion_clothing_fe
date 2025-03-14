// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './Advertisement.module.scss';
import IconSVG from '~/components/common/icon/IconSVG';
import { icons } from '~/assets';
import { useTranslation } from 'react-i18next';

type Props = {};

const cx = classNames.bind(styles);

const Example = (props: Props) => {
    const { t } = useTranslation();

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div id='advertisementComponent' className={cx('mainAdvertisement')}>
            <div>
                <IconSVG IconComponent={icons.deliveryIcon} />
                <b>{t('user_title_free_shipping_advertisement')}</b>
                <br />
                <span>{t('user_label_free_shipping_advertisement')}</span>
            </div>
            <div>
                <IconSVG IconComponent={icons.currencyDollarIcon} />
                <b>{t('user_title_money_guarantee_advertisement')}</b>
                <br />
                <span>{t('user_label_money_guarantee_advertisement')}</span>
            </div>
            <div>
                <IconSVG IconComponent={icons.headphoneIcon} />
                <b>{t('user_title_online_support_advertisement')}</b>
                <br />
                <span>{t('user_label_online_support_advertisement')}</span>
            </div>
            <div>
                <IconSVG IconComponent={icons.paymentIcon} />
                <b>{t('user_title_flexible_payment_advertisement')}</b>
                <br />
                <span>{t('user_label_flexible_payment_advertisement')}</span>
            </div>
        </div>
    );
};

export default Example;
