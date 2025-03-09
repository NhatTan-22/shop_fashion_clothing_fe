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
import { Avatar, Badge, Button, Dropdown, Empty, Typography } from 'antd';

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
                                <div>
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: '1',
                                                    label: (
                                                        <Typography.Title level={4}>
                                                            You have 0 item in your cart
                                                        </Typography.Title>
                                                    ),
                                                },
                                                {
                                                    key: '2',
                                                    label: <Empty description='No product in cart' />,
                                                },
                                                {
                                                    key: '3',
                                                    label: (
                                                        <div className='flex flex-col gap-4 w-full'>
                                                            <div className='w-full flex items-center justify-between'>
                                                                <Typography.Title level={4} className='!m-0'>
                                                                    Subtotal
                                                                </Typography.Title>
                                                                <Typography.Title level={4} className='!m-0'>
                                                                    $200.00
                                                                </Typography.Title>
                                                            </div>
                                                            <Link to={`${userRoute.products}${userRoute.cart}`}>
                                                                <Button size='large' className='w-full' type='default'>
                                                                    View Cart
                                                                </Button>
                                                            </Link>
                                                            <Link to={`${userRoute.products}${userRoute.cart}`}>
                                                                <Button size='large' className='w-full' type='primary'>
                                                                    Checkout
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    ),
                                                },
                                            ],
                                        }}
                                        placement='bottomRight'
                                        className='cursor-pointer'
                                        arrow={{ pointAtCenter: true }}
                                        trigger={['click']}
                                    >
                                        <Badge count={1} offset={[0, 20]} color='#c083f8'>
                                            <IconSVG IconComponent={icons.cartIcon} />
                                        </Badge>
                                    </Dropdown>
                                </div>
                                <div>
                                    {!user ? (
                                        <Link to='/auth/login'>
                                            <BaseButton nameButton='Login' />
                                        </Link>
                                    ) : (
                                        <Dropdown
                                            menu={{
                                                items: [
                                                    {
                                                        key: '1',
                                                        label: `Welcome, ${user.firstName} ${user.lastName}!`,
                                                    },
                                                    {
                                                        key: '2',
                                                        label: (
                                                            <Link to='/profile' className='flex justify-center'>
                                                                My Profile
                                                            </Link>
                                                        ),
                                                    },
                                                    {
                                                        key: '3',
                                                        label: (
                                                            <Button
                                                                className='w-full'
                                                                type='text'
                                                                onClick={handleLogout}
                                                            >
                                                                Logout
                                                            </Button>
                                                        ),
                                                    },
                                                ],
                                            }}
                                            placement='bottomRight'
                                            className='cursor-pointer'
                                            arrow={{ pointAtCenter: true }}
                                            trigger={['click']}
                                        >
                                            <Avatar
                                                className='w-14 h-14'
                                                shape='circle'
                                                src={user.photoUrl ?? `${baseURL}/${user.photoUrl}`}
                                                alt={`${user.firstName} ${user.lastName}`}
                                            />
                                        </Dropdown>
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
