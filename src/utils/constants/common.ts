import { icons } from '~/assets';
import { ISideBar } from '../interfaces/common';

export const Languages = ['en', 'vi'];

export const sidebarItems: ISideBar[] = [
    {
        path: '/admin/dash-board',
        label: 'admin_dashBoard',
        icon: icons.homeIcon,
    },
    {
        path: '/admin/inventory',
        label: 'admin_inventory',
        icon: icons.inventoryIcon,
        children: [
            {
                path: '/admin/inventory',
                label: 'admin_inventory_products',
            },
            {
                path: '/admin/inventory/categories',
                label: 'admin_inventory_categories',
            },
        ],
    },
    {
        path: '/admin/reports',
        label: 'admin_reports',
        icon: icons.reportIcon,
    },
    {
        path: '/admin/suppliers',
        label: 'admin_suppliers',
        icon: icons.supplierIcon,
    },
];

export const listHeader = [
    {
        title: 'user_title_products_navigation',
        path: '/products',
    },
    {
        title: 'user_title_blog_navigation',
        path: '/blog',
    },
    {
        title: 'user_title_contact_navigation',
        path: '/contact',
    },
];
