// Libs
import React from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './Register.module.scss';
import { icons } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Register = (props: Props) => {
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
    const handleGetInput = () => {};

    const handleRegister = () => {
    };
    //#endregion Handle Function

    return (
        <div id='formRegisterPage'>
            <form onSubmit={handleRegister}>
                <div className={cx('headerFormRegister')}>
                    <h1>{t('Create an account')}</h1>
                    {/* <p>{t('Welcome back! Please enter your details.')}</p> */}
                </div>
                <div className={cx('fullName')}>
                    <div>
                        <label className={cx('labelRegister')} htmlFor='firstName-register'>
                            <img src={icons.userIcon} alt='' /> {t('register_first_name_label')}
                        </label>
                        <input
                            className={cx('inputFormRegister')}
                            id='firstName-register'
                            type='text'
                            name='name'
                            autoComplete='new-firstName'
                            placeholder={t('register_first_name_placeholder')}
                            required
                            onChange={handleGetInput}
                        />
                    </div>

                    <div>
                        <label className={cx('labelRegister')} htmlFor='lastName-register'>
                            <img src={icons.userIcon} alt='' /> {t('register_last_name_label')}
                        </label>
                        <input
                            className={cx('inputFormRegister')}
                            id='lastName-register'
                            type='text'
                            name='name'
                            autoComplete='new-lastName'
                            placeholder={t('register_last_name_placeholder')}
                            required
                            onChange={handleGetInput}
                        />
                    </div>
                </div>
                <div className='mb-6'>
                    <label className={cx('labelRegister')} htmlFor='phone-register'>
                        <img src={icons.phoneIcon} alt='' /> {t('register_phone_label')}
                    </label>
                    <input
                        className={cx('inputFormRegister')}
                        id='phone-register'
                        type='text'
                        name='phone'
                        autoComplete='new-lastName'
                        placeholder={t('register_phone_placeholder')}
                        required
                        onChange={handleGetInput}
                    />
                </div>
                <div className='mb-6'>
                    <label className={cx('labelRegister')} htmlFor='email-register'>
                        <img src={icons.emailIcon} alt='' /> {t('register_email_label')}
                    </label>
                    <input
                        className={cx('inputFormRegister')}
                        id='email-register'
                        type='email'
                        name='email'
                        placeholder={t('register_email_placeholder')}
                        required
                        onChange={handleGetInput}
                    />
                </div>
                <div className='mb-6'>
                    <label className={cx('labelRegister')} htmlFor='password-register'>
                        <img src={icons.keyIcon} alt='' /> {t('register_password_label')}
                    </label>
                    <input
                        className={cx('inputFormRegister')}
                        id='password-register'
                        type='password'
                        name='password'
                        autoComplete='new-password'
                        required
                        placeholder={t('register_password_placeholder')}
                        onChange={handleGetInput}
                    />
                </div>
                <BaseButton styleButton={ButtonStyleEnum.PRIMARY} nameButton={t('common_register')} />
                <div className={cx('textLogin')}>
                    {t('register_have_account')}
                    <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                        <Link to='/auth/login'>{t('common_login')}</Link>
                    </BaseButton>
                </div>
            </form>
        </div>
    );
};

export default Register;
