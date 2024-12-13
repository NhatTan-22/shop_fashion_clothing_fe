// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { useAppDispatch } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { ILogin } from '~/utils/interfaces/auth';
import { ButtonStyleEnum, TypeButtonENum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './Login.module.scss';
import { icons } from '~/assets';
import { authLogin } from '~/thunks/auth/authThunk';
import { adminRoute, userRoute } from '~/utils/constants/route';

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

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        loadingContext?.show();
        dispatch(authLogin(dataLogin))
            .then((response) => {
                if (response?.payload) {
                    const role = response?.payload?.role;
                    console.log(response);
                    // if (role === 0) {
                    //     navigate(`${adminRoute.base}${adminRoute.dashboard}`);
                    // }
                    // navigate(`${userRoute.base}`);
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                loadingContext?.hide();
            });
    };
    //#endregion Handle Function

    return (
        <div id='formLoginPage' className={cx('mainLogin')}>
            <form onSubmit={handleLogin}>
                <div className={cx('headerFormLogin')}>
                    <h1>{t('login_title_header')}</h1>
                    <p>{t('login_title_label')}</p>
                </div>
                <div className='mb-6'>
                    <label className={cx('labelLogin')} htmlFor='email-login'>
                        <img src={icons.emailIcon} alt='' /> {t('login_email_label')}
                    </label>
                    <input
                        className={cx('inputFormLogin')}
                        id='email-login'
                        name='email'
                        type='email'
                        autoComplete='new-email'
                        placeholder={t('login_email_placeholder')}
                        onChange={handleGetInput}
                    />
                </div>
                <div>
                    <label className={cx('labelLogin')} htmlFor='password-login'>
                        <img src={icons.keyIcon} alt='' /> {t('login_password_label')}
                    </label>
                    <input
                        className={cx('inputFormLogin')}
                        id='password-login'
                        name='password'
                        autoComplete='new-password'
                        type='password'
                        placeholder={t('login_password_placeholder')}
                        onChange={handleGetInput}
                    />
                </div>
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
            </form>
        </div>
    );
};

export default Login;
