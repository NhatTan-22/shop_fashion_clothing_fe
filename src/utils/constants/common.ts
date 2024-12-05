import { icons } from "~/assets";
import { ISideBar } from "../interfaces/common";

export const Languages = ['en', 'vi'];

export type TypeButton = "submit" | "reset" | "button";


export const sidebarItems: ISideBar[] = [
    {
        path: '/admin/dash-board',
        label: 'DashBoard',
        images: `${icons.homeIcon}`
    },
    {
        path: '/admin/inventory',
        label: 'Inventory',
        images: `${icons.inventoryIcon}`
    },
    {
        path: '/admin/reports',
        label: 'Reports',
        images: `${icons.reportIcon}`
    }
];