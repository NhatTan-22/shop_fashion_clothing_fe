// Libs
import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Form, Input, message } from 'antd';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { useAppDispatch } from '~/redux/hooks';
import { authRegister } from '~/thunks/auth/authThunk';
import { ButtonStyleEnum, TypeButtonENum } from '~/utils/constants/enum';
import { IRegister } from '~/utils/interfaces/auth';
// Context
import { LoadingContext } from '~/context';
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
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [data, setData] = useState<IRegister>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function

    const handleGetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = () => {
        loadingContext?.show();
        dispatch(authRegister(data))
            .unwrap()
            .then((response) => {
                console.log(response)
                message.success(`${t('register_success')}`);
            })
            .catch((error) => {
                if (error?.code === 400) {
                    message.warning(`${'register_error_already_exist'}`);
                } else {
                    message.error(error.message);
                }
            })
            .finally(() => {
                loadingContext?.hide();
            });
        console.log(data);
    };
    //#endregion Handle Function

    return (
        <div id='formRegisterPage'>
            <Form name='register' layout='vertical' onFinish={handleRegister}>
                <div className={cx('headerFormRegister')}>
                    <h1>{t('Create an account')}</h1>
                    {/* <p>{t('Welcome back! Please enter your details.')}</p> */}
                </div>
                <div className={cx('fullName')}>
                    <div>
                        <label className={cx('labelRegister')} htmlFor='firstName-register'>
                            <img src={icons.userIcon} alt='' /> {t('register_first_name_label')}
                        </label>
                        <Input
                            className={cx('inputFormRegister')}
                            id='firstName-register'
                            name='firstName'
                            type='text'
                            autoFocus
                            autoComplete='new-firstName'
                            placeholder={t('register_first_name_placeholder')}
                            title={t('register_first_name_label')}
                            onChange={handleGetInput}
                        />
                    </div>

                    <div>
                        <label className={cx('labelRegister')} htmlFor='lastName-register'>
                            <img src={icons.userIcon} alt='' /> {t('register_last_name_label')}
                        </label>
                        <Input
                            className={cx('inputFormRegister')}
                            id='lastName-register'
                            name='lastName'
                            type='text'
                            autoComplete='new-lastName'
                            placeholder={t('register_last_name_placeholder')}
                            title={t('register_last_name_label')}
                            onChange={handleGetInput}
                        />
                    </div>
                </div>
                <Form.Item
                    name='phone'
                    label={
                        <label className={cx('labelRegister')} htmlFor='phone-register'>
                            <img src={icons.phoneIcon} alt='' /> {t('register_phone_label')}
                        </label>
                    }
                    rules={[{ required: true, message: `${t('register_phone_error_message')}` }]}
                >
                    <Input
                        className={cx('inputFormRegister')}
                        id='phone-register'
                        name='phone'
                        type='text'
                        autoComplete='new-phone'
                        placeholder={t('register_phone_placeholder')}
                        title={t('register_phone_label')}
                        onChange={handleGetInput}
                    />
                </Form.Item>
                <Form.Item
                    name='email'
                    label={
                        <label className={cx('labelRegister')} htmlFor='email-register'>
                            <img src={icons.emailIcon} alt='' />
                            {t('register_email_label')}
                        </label>
                    }
                    rules={[{ required: true, message: `${t('register_email_error_message')}` }]}
                >
                    <Input
                        className={cx('inputFormRegister')}
                        id='email-register'
                        name='email'
                        type='email'
                        autoComplete='new-email'
                        placeholder={t('register_email_placeholder')}
                        title={t('register_email_label')}
                        onChange={handleGetInput}
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    label={
                        <label className={cx('labelRegister')} htmlFor='password-register'>
                            <img src={icons.keyIcon} alt='' /> {t('register_password_label')}
                        </label>
                    }
                    rules={[{ required: true, message: `${t('register_password_error_message')}` }]}
                >
                    <Input.Password
                        className={cx('inputFormRegister')}
                        id='password-register'
                        name='password'
                        type='password'
                        autoComplete='new-password'
                        placeholder={t('register_password_placeholder')}
                        title={t('register_password_label')}
                        onChange={handleGetInput}
                    />
                </Form.Item>
                <Form.Item>
                    <BaseButton
                        styleButton={ButtonStyleEnum.PRIMARY}
                        nameButton={t('common_register')}
                        type={TypeButtonENum.SUBMIT}
                    />
                    <div className={cx('textLogin')}>
                        {t('register_have_account')}
                        <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                            <Link to='/auth/login'>{t('common_login')}</Link>
                        </BaseButton>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
