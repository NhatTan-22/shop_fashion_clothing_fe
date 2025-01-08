// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import { icons, images } from '~/assets';
import styles from './UserLayout.module.scss';

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
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    //#endregion Declare State

    //#region Implement Hook
    const listHeader = [
        {
            title: 'user_title_products_navigation',
            //   icon: <FaAngleDown className="inline-flex mx-1" />,
            path: '/products',
        },
        {
            title: 'user_title_blog_navigation',
            //   icon: <FaAngleDown className="inline-flex mx-1" />,
            path: '/blog',
        },
        {
            title: 'user_title_contact_navigation',
            icon: '',
            path: '/contact',
        },
    ];
    //#endregion Implement Hook

    //#region Handle Function
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                            {/* <FaLocationDot /> */}
                            <img src={icons.addressIcon} alt={t('user_name_store_header_top')} />
                            <span>{t('user_name_store_header_top')}</span>
                        </span>
                        <span className={cx('titleRightHeaderTop')}>
                            {/* <FaPhoneFlip /> */}
                            <span>{t('user_phone_header_top')}</span>
                        </span>
                    </div>
                </div>

                <div className={cx('navigateHeader')}>
                    <Link to='/'>
                        <div className='w-72'>
                            <img className='w-24 h-24 object-fill' alt='LOGO_SHOP' src={images.logoFashionStore} />
                        </div>
                    </Link>
                    <div className='flex w-full'>
                        <ul className='flex justify-between items-center '>
                            {listHeader.map((header) => (
                                <Link key={header.path} to={header.path}>
                                    <li className='mr-8 pb-0 hover:text-red-600 '>
                                        <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                                            <span>{t(`${header.title}`)}</span>
                                            {header.icon}
                                        </BaseButton>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('actionUser')}>
                        <form action='/' className='relative'>
                            <input
                                // onChange=""
                                className={cx('inputSearch')}
                                type='text'
                                placeholder='Search our store...'
                            />
                            <div className='absolute top-0 right-6'>
                                <BaseButton
                                    styleButton={ButtonStyleEnum.TEXT}
                                    nextIcon={`${icons.searchIcon}`}
                                    className='focus:text-blue-500'
                                />
                            </div>
                        </form>
                        <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                            <Link to='/wishlist'>
                                <img src={icons.heartIcon} alt='' />
                            </Link>
                        </BaseButton>
                        <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                            <div className='relative'>
                                <Link to='order'>
                                    <img src={icons.cartIcon} alt='' />
                                    <div className='absolute top-2 left-3 rounded-full bg-wisteria-600'>
                                        <span className='px-2 text-white'>0</span>
                                    </div>
                                </Link>
                            </div>
                        </BaseButton>
                        {/* <BaseButton styleButton={ButtonStyleEnum.TEXT}>
                            <img
                                className='w-10 h-10 rounded-full'
                                src='https://th.bing.com/th/id/OIP.Gg0lRdcH7S-EO2NWbRzCMQAAAA?pid=ImgDet&w=167&h=183&c=7&dpr=1.3'
                                alt=''
                            />
                        </BaseButton> */}
                        <Link to='/auth/login'>
                            <BaseButton nameButton='Login' />
                        </Link>
                        <Link to='/auth/register'>
                            <BaseButton nameButton='Register' />
                        </Link>
                        {/* <Menu
                        id='basic-menu'
                        // anchorEl={anchorEl}
                        // open={open}
                        // onClose={handleClose}
                        // MenuListProps={{
                        //     'aria-labelledby': 'basic-button',
                        // }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <Link to='/auth/login'>
                            <MenuItem>Logout</MenuItem>
                        </Link>
                    </Menu> */}
                    </div>
                </div>
            </div>

            <div className={cx('wrapperBody')}>
                <Outlet />
            </div>

            <div className='w-full py-16 bg-bossa-nova-900 text-white'>
                <div className='grid grid-flow-col gap-28 max-w-screen-2xl mx-auto h-44'>
                    <div>
                        <img className='w-32 h-32 p-6 rounded-full' alt='LOGO_SHOP' src={images.fashionStore} />
                        <p>©2024 Nhat Tan | Built with by Nhat Tan.</p>
                    </div>
                    <div>
                        <h1 className='font-semibold text-2xl mb-4'>LIÊN HỆ</h1>
                        <ul>
                            <li className='flex items-center'>
                                <b>Hotline:</b>{' '}
                                <BaseButton styleButton={ButtonStyleEnum.TEXT} className='hover:text-red-500'>
                                    09655664487
                                </BaseButton>
                            </li>
                            <li className='flex items-center'>
                                <b>Trang Web :</b>{' '}
                                <BaseButton styleButton={ButtonStyleEnum.TEXT} className='hover:text-red-500'>
                                    pntShop.com
                                </BaseButton>
                            </li>
                            <li className='flex items-center'>
                                <b>Email :</b>{' '}
                                <BaseButton styleButton={ButtonStyleEnum.TEXT} className='hover:text-red-500'>
                                    pntShop@gamil.com
                                </BaseButton>
                            </li>
                            <li className='flex items-center'>
                                <b>Địa Chỉ :</b>{' '}
                                <BaseButton styleButton={ButtonStyleEnum.TEXT} className='hover:text-red-500'>
                                    Quảng Ninh
                                </BaseButton>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='font-semibold text-2xl mb-4'>HỖ TRỢ KHÁCH HÀNG</h1>
                        <ul>
                            <li>Chính sách đổi trả và bảo hành</li>
                            <li>Chính sách bảo mật</li>
                            <li>Chính sách thanh toán</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='font-semibold text-2xl mb-4'>THÔNG TIN</h1>
                        <p>
                            Tải xuống Ứng dụng của chúng tôi và được giảm giá thêm 15% cho đơn hàng đầu tiên của bạn..!
                        </p>
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
