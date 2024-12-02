// Libs
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
// Styles, Images, icons
import styles from './NotFound.module.scss';
import { useTranslation } from 'react-i18next';
import { ButtonStyleEnum } from '~/utils/constants/enum';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const NotFoundPage = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Example Component' } = props;
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
        <div>
            <div className='relative'>
                {/* <img className='h-screen w-screen object-contain' alt='NotFound_404' src='' /> */}
            </div>
            <div className='absolute top-56 text-center text-base w-full text-orange-500'>
                {/* <img className="w-1/2 h-1/2 rounded-full" alt="" src="/images/LogoTS.png" /> */}
                <h1 className='text-5xl font-bold'>{t('No content found')}</h1>
                <ul className='mt-4 flex flex-col gap-2 text-base'>
                    <li>
                        {t('The URL of this content has been')} <strong>{t('changed')}</strong> {t('OR')}{' '}
                        <strong>{t('no longer exists')}</strong>.
                    </li>
                    <li>
                        {t('If you')} <strong>{t('saving this URL')}</strong>,{t('try it')}{' '}
                        <strong>{t('re-access from home page')} </strong> {t('instead of using the saved URL.')}
                    </li>
                </ul>
                <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                    <Link to='/'>{t('Visit home page')}</Link>
                </BaseButton>
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
