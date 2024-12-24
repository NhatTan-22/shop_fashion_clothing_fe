// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Form, Input, message } from 'antd';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { useAppDispatch } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { ILogin } from '~/utils/interfaces/auth';
import { ButtonStyleEnum, TypeButtonENum } from '~/utils/constants/enum';
import { authLoginThunk } from '~/thunks/auth/authThunk';
import { navigateLogin } from '~/utils/constants/helper';
// Styles, Images, icons
import styles from './Login.module.scss';
import { icons } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Login = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [dataLogin, setDataLogin] = useState<ILogin>({
        email: '',
        password: '',
    });
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleGetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        // e.preventDefault();
        loadingContext?.show();
        dispatch(authLoginThunk(dataLogin))
            .unwrap()
            .then((response) => {
                if (response?.data) {
                    sessionStorage.setItem('data', JSON.stringify(response?.data));
                    const router = navigateLogin(response?.data?.role);
                    navigate(`${router}`);
                    message.success(`${t('login_success')}`);
                }
            })
            .catch((error) => {
                if (error?.code === 1012) {
                    message.warning(`${t('login_error_failed')}`);
                } else {
                    message.error(`${t('login_error_not_exist')}`);
                }
            })
            .finally(() => {
                loadingContext?.hide();
            });
    };
    //#endregion Handle Function

    return (
        <div id='formLoginPage' className={cx('mainLogin')}>
            <Form name='login' layout='vertical' onFinish={handleLogin}>
                <div className={cx('headerFormLogin')}>
                    <h1 className={cx('titleHear')}>
                        {t('login_title_header')}
                    </h1>
                    <p>{t('login_title_label')}</p>
                </div>
                <Form.Item
                    name='email'
                    label={
                        <label className={cx('labelLogin')} htmlFor='email-login'>
                            <img src={icons.emailIcon} alt='' /> {t('login_email_label')}
                        </label>
                    }
                    rules={[{ required: true, message: `${t('register_email_error_message')}` }]}
                >
                    <Input
                        className={cx('inputFormLogin')}
                        id='email-login'
                        name='email'
                        type='email'
                        autoFocus
                        autoComplete='new-email'
                        placeholder={t('login_email_placeholder')}
                        title={t('login_email_label')}
                        onChange={handleGetInput}
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    label={
                        <label className={cx('labelLogin')} htmlFor='password-login'>
                            <img src={icons.keyIcon} alt='' /> {t('login_password_label')}
                        </label>
                    }
                    rules={[{ required: true, message: `${t('register_password_error_message')}` }]}
                >
                    <Input.Password
                        className={cx('inputFormLogin')}
                        id='password-login'
                        name='password'
                        type='password'
                        autoComplete='new-password'
                        placeholder={t('login_password_placeholder')}
                        title={t('login_password_label')}
                        onChange={handleGetInput}
                    />
                </Form.Item>
                <div className={cx('textForgotPass')}>
                    <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                        <Link to='/auth/login'>{t('login_forgot_password')}</Link>
                    </BaseButton>
                </div>
                <BaseButton
                    type={TypeButtonENum.SUBMIT}
                    title={t('common_button_login_title')}
                    nameButton={t('common_login')}
                    styleButton={ButtonStyleEnum.PRIMARY}
                />
                <div className={cx('textRegister')}>
                    {t('login_not_account')}
                    <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                        <Link to='/auth/register'>{t('common_register')}</Link>
                    </BaseButton>
                </div>
            </Form>
        </div>
    );
};

export default Login;
