// Libs
import classNames from 'classnames/bind';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { Avatar, Button, Input, Layout, Menu, MenuProps } from 'antd';
// Components, Layouts, Pages
import { IconSVG } from '~/components';
// Others
import { baseURL } from '~/utils/constants/env';
import { RootState } from '~/redux/store';
import { authActions } from '~/thunks/auth/authSlice';
// Styles, Images, <IconSVG IconComponent={}icons
import styles from './AdminLayout.module.scss';
import { icons, images } from '~/assets';

type Props = {
    content?: string;
};
const { Header, Sider, Content } = Layout;
const { Search } = Input;
type MenuItem = Required<MenuProps>['items'][number];

const cx = classNames.bind(styles);

const AdminLayout = (props: Props) => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    //#endregion Declare Hook

    //#region Selector
    const admin = useAppSelector((state: RootState) => state.auth.user);
    //#endregion Selector

    //#region Declare State
    const [collapsed, setCollapsed] = useState<boolean>(false);
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    //#endregion Implement Hook

    //#region Handle Function
    const items: MenuItem[] = [
        {
            key: '/admin/dash-board',
            label: `${t('admin_dashBoard')}`,
            icon: (
                <div>
                    <IconSVG IconComponent={icons.homeIcon} />
                </div>
            ),
            onClick: () => navigate('/admin/dash-board'),
        },
        {
            key: '/admin/inventory',
            label: `${t('admin_inventory')}`,
            icon: (
                <div>
                    <IconSVG IconComponent={icons.inventoryIcon} />
                </div>
            ),
            children: [
                {
                    key: '/admin/inventory/products',
                    label: `${t('admin_inventory_products')}`,
                    onClick: () => navigate('/admin/inventory/products'),
                },
                {
                    key: '/admin/inventory/categories',
                    label: `${t('admin_inventory_categories')}`,
                    onClick: () => navigate('/admin/inventory/categories'),
                },
                {
                    key: '/admin/inventory/brands',
                    label: `${t('admin_inventory_brands')}`,
                    onClick: () => navigate('/admin/inventory/brands'),
                },
            ],
        },
        {
            key: '/admin/reports',
            label: `${t('admin_reports')}`,
            icon: (
                <div>
                    <IconSVG IconComponent={icons.reportIcon} />
                </div>
            ),
            onClick: () => navigate('/admin/reports'),
        },
        {
            key: '/admin/suppliers',
            label: `${t('admin_suppliers')}`,
            icon: (
                <div>
                    <IconSVG IconComponent={icons.supplierIcon} />
                </div>
            ),
            onClick: () => navigate('/admin/suppliers'),
        },
        {
            key: '/admin/orders',
            label: `${t('admin_orders')}`,
            icon: (
                <div>
                    <IconSVG IconComponent={icons.orderIcon} />
                </div>
            ),
            onClick: () => navigate('/admin/orders'),
        },
    ];

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    };

    const handleSideBar = () => {
        setCollapsed(!collapsed);
    };
    const handleOpenDialog = () => {};

    const handleLogout = () => {
        dispatch(authActions.handleLogout());
        navigate('/auth/login');
    };
    //#endregion Handle Function

    return (
        <div id='adminLayout' className={cx('mainAdminLayout')}>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div>
                        <img className={cx('logoFashionStore')} src={images.logoFashionStore} alt='' />
                    </div>
                    <Menu
                        mode='inline'
                        style={{ height: 'auto' }}
                        defaultSelectedKeys={[location.pathname]}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button type='text' onClick={handleSideBar}>
                            <IconSVG IconComponent={collapsed ? icons.listMenuIcon : icons.listItemIcon} />
                        </Button>
                        <Search type='text' style={{ width: 304 }} placeholder={t('Search product, supplier, order')} />
                        <div className={cx('information')}>
                            <Button type='text'>
                                <IconSVG IconComponent={icons.notification} width={40} height={40} />
                            </Button>
                            {admin && (
                                <>
                                    <Avatar
                                        size='large'
                                        src={admin.photoUrl ? `${baseURL}/${admin.photoUrl}` : `${admin.photoUrl}`}
                                        alt=''
                                        // onClick={handleOpenDialog}
                                    />
                                    <Button type='text' onClick={handleLogout}>
                                        {`Welcome, ${admin.firstName} ${admin.lastName}!`}
                                    </Button>
                                </>
                            )}
                        </div>
                    </Header>
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AdminLayout;
