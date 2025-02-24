// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
// Components, Layouts, Pages
import { BaseButton, IconSVG } from '~/components';
// Others
import { RootState } from '~/redux/store';
import { authActions } from '~/thunks/auth/authSlice';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { listHeader } from '~/utils/constants/common';
import { baseURL } from '~/utils/constants/env';
// Styles, Images, icons
import { icons, images } from '~/assets';
import styles from './UserLayout.module.scss';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { userRoute } from '~/utils/constants/route';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const UserLayout = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    //#endregion Declare Hook

    //#region Selector
    const user = useAppSelector((state: RootState) => state.auth.user);
    //#endregion Selector

    //#region Declare State
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isOpenSideBae, setIsOpenSidebar] = useState<boolean>(true);
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    //#endregion Implement Hook

    //#region Handle Function
    const handleResize = () => {
        if (window.innerWidth <= 1023) {
            setIsOpenSidebar(false);
        } else {
            setIsOpenSidebar(true);
        }
    };

    const handleSideBar = () => {
        setIsOpenSidebar(!isOpenSideBae);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(authActions.handleLogout());
    };
    //#endregion Handle Function

    return (
        <div id='userLayout' className={cx('mainUserLayout')}>
            <div className={cx('header')}>
                <div className={cx('titleHeaderTop')}>
                    <div>
                        <span className=''>{t('user_title_header_top')}</span>
                    </div>
                    <div className='flex'>
                        <span className={cx('titleRightHeaderTop')}>
                            {/* Option Select  */}
                            <span>USD</span>
                            {/* <FaAngleDown /> */}
                        </span>
                        <span className={cx('titleRightHeaderTopLocation')}>
                            <IconSVG IconComponent={icons.addressIcon} />
                            <span>{t('user_name_store_header_top')}</span>
                        </span>
                        <span className={cx('titleRightHeaderTop')}>
                            <IconSVG IconComponent={icons.phoneIcon} />
                            <span>{t('user_phone_text')}</span>
                        </span>
                    </div>
                </div>

                <div className={cx('navigateHeader')}>
                    <Link to='/'>
                        <div className='w-[200px] mr-6'>
                            <img className='w-24 h-24 object-fill' alt='LOGO_SHOP' src={images.logoFashionStore} />
                        </div>
                    </Link>
                    {isOpenSideBae ? (
                        <>
                            <div className={cx('navigate')}>
                                <ul className='flex justify-between items-center '>
                                    {listHeader.map((header) => (
                                        <Link key={header.path} to={header.path}>
                                            <li className='mr-8 pb-0 hover:text-red-600 '>
                                                <BaseButton
                                                    styleButton={ButtonStyleEnum.TEXT}
                                                    nameButton={t(`${header.title}`)}
                                                />
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                            <div className={cx('actionUser')}>
                                <form action='/' className={cx('formSearch')}>
                                    <input
                                        // onChange=""
                                        className={cx('inputSearch')}
                                        type='text'
                                        placeholder='Search our store...'
                                    />
                                    <div className={cx('iconSearch')}>
                                        <IconSVG IconComponent={icons.searchIcon} />
                                    </div>
                                </form>
                                <Link to='/wishlist'>
                                    <IconSVG IconComponent={icons.heartIcon} />
                                </Link>
                                <div className='relative'>
                                    <Link to={`${userRoute.products}${userRoute.order}`}>
                                        <IconSVG IconComponent={icons.cartIcon} />
                                        <div className='absolute top-2 left-4 rounded-full bg-wisteria-600'>
                                            <span className='px-2 text-white'>0</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('identityUser')}>
                                    {!user ? (
                                        <Link to='/auth/login'>
                                            <BaseButton nameButton='Login' />
                                        </Link>
                                    ) : (
                                        <>
                                            <img
                                                className='w-10 h-10 rounded-full'
                                                src={user.photoUrl ? `${baseURL}/${user.photoUrl}` : `${user.photoUrl}`}
                                                alt=''
                                            />
                                            <BaseButton
                                                width='100px'
                                                styleButton={ButtonStyleEnum.TEXT}
                                                onClick={handleLogout}
                                                nameButton={`Welcome, ${user.firstName} ${user.lastName}!`}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <IconSVG IconComponent={icons.listMenuIcon} onClick={handleSideBar} />
                    )}
                </div>
            </div>

            <div className={cx('wrapperBody')}>
                <Outlet />
            </div>

            <div className={cx('footer')}>
                <div className={cx('contentFooter')}>
                    <div>
                        <img className='w-32 h-32 p-6 rounded-full' alt='LOGO_SHOP' src={images.fashionStore} />
                        <p>{t('user_footer_brand')}</p>
                    </div>
                    <div>
                        <h1>{t('user_footer_contact_title')}</h1>
                        <ul>
                            <li className={cx('titleFooter')}>
                                <b>{t('user_footer_phone_title')}</b>
                                <BaseButton styleButton={ButtonStyleEnum.TEXT} nameButton={t('user_phone_text')} />
                            </li>
                            <li className={cx('titleFooter')}>
                                <b>{t('user_footer_website_title')}</b>
                                <BaseButton styleButton={ButtonStyleEnum.TEXT} nameButton='ShopFashionClothing.com' />
                            </li>
                            <li className={cx('titleFooter')}>
                                <b>{t('user_footer_email_title')}</b>
                                <BaseButton
                                    styleButton={ButtonStyleEnum.TEXT}
                                    nameButton='ShopFashionClothing@gamil.com'
                                />
                            </li>
                            <li className={cx('titleFooter')}>
                                <b>{t('user_footer_address_title')}</b>
                                <BaseButton styleButton={ButtonStyleEnum.TEXT} nameButton='Quảng Ninh' />
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h1>{t('user_footer_customer_support_title')}</h1>
                        <ul>
                            <li>{t('user_footer_guarantee')}</li>
                            <li>{t('user_footer_security')}</li>
                            <li>{t('user_footer_payment')}</li>
                        </ul>
                    </div>
                    <div>
                        <h1>{t('user_footer_information_title')}</h1>
                        <p>{t('user_footer_information_description')}</p>
                        <div className='flex gap-2 mt-5'>
                            <BaseButton>
                                <img
                                    className=' h-auto rounded-sm'
                                    alt='Google Play'
                                    src='/images/footer/GooglePlay.png'
                                />
                            </BaseButton>
                            <BaseButton>
                                <img className=' h-auto rounded-sm' alt='App Store' src='/images/footer/AppStore.png' />
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
