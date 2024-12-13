import { icons } from "~/assets";
import { ISideBar } from "../interfaces/common";

export const Languages = ['en', 'vi'];

export const sidebarItems: ISideBar[] = [
    {
        path: '/admin/dash-board',
        label: 'admin_dashBoard',
        images: `${icons.homeIcon}`
    },
    {
        path: '/admin/inventory',
        label: 'admin_inventory',
        images: `${icons.inventoryIcon}`
    },
    {
        path: '/admin/reports',
        label: 'admin_reports',
        images: `${icons.reportIcon}`
    },
    {
        path: '/admin/suppliers',
        label: 'admin_suppliers',
        images: `${icons.supplierIcon}`
    }
];