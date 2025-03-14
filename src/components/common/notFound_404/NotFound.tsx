// Libs
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './NotFound.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const NotFoundPage = (props: Props) => {
    const { t } = useTranslation();

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div>
            <div className={cx('headerNotFound')}>{/* <img alt='NotFound_404' src='' /> */}</div>
            <div className={cx('contentNotFound')}>
                {/* <img alt='' src={images.fashionStore} /> */}
                <Typography.Title level={1}>{t('common_not_found_confirm_title')}</Typography.Title>
                <ul className={cx('contentOne')}>
                    <li>
                        {t('The URL of this content has been')} <strong>{t('changed')}</strong> {t('OR')}{' '}
                        <strong>{t('no longer exists')}</strong>.
                    </li>
                    <li>
                        {t('If you')} <strong>{t('saving this URL')}</strong>,{t('try it')}{' '}
                        <strong>{t('re-access from home page')} </strong> {t('instead of using the saved URL.')}
                    </li>
                    <li>
                        <Link to='/'>
                            <BaseButton styleButton={ButtonStyleEnum.TEXT} nameButton={t('Visit home page')} />
                        </Link>
                    </li>
                </ul>

                <div className={cx('orToProduct')}>
                    👉 hoặc đi tới
                    <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                        <Link to='/products'>{t('Product')}</Link>
                    </BaseButton>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
