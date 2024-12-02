// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
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
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    const handleGetInput = () => {};

    const handleLogin = () => {};
    //#endregion Handle Function

    return (
        <div id='formLoginPage' className={cx('mainLogin')}>
            <form onSubmit={handleLogin}>
                <div className={cx('headerFormLogin')}>
                    <h1>{t('Log in to your account')}</h1>
                    <p>{t('Welcome back! Please enter your details.')}</p>
                </div>
                <div className='mb-6'>
                    <label className={cx('labelLogin')} htmlFor='email-login'>
                        <img src={icons.emailIcon} alt='' /> {t('Email')}
                    </label>
                    <input
                        className={cx('inputFormLogin')}
                        id='email-login'
                        name='email'
                        type='email'
                        autoComplete='new-email'
                        placeholder={t('Enter your email')}
                        onChange={handleGetInput}
                    />
                </div>
                <div>
                    <label className={cx('labelLogin')} htmlFor='password-login'>
                        <img src={icons.keyIcon} alt='' /> {t('Password')}
                    </label>
                    <input
                        className={cx('inputFormLogin')}
                        id='password-login'
                        name='password'
                        autoComplete='new-password'
                        type='password'
                        placeholder={t('********')}
                        onChange={handleGetInput}
                    />
                </div>
                <div className={cx('textForgotPass')}>
                    <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                        <Link to='/auth/login'>{t('Forgot password')}</Link>
                    </BaseButton>
                </div>
                <BaseButton title={t('Button login')} nameButton={t('Login')} styleButton={ButtonStyleEnum.PRIMARY} />
                <div className={cx('textRegister')}>
                    {t('Don’t have an account?')}
                    <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                        <Link to='/auth/register'>{t('Register')}</Link>
                    </BaseButton>
                </div>
            </form>
        </div>
    );
};

export default Login;
