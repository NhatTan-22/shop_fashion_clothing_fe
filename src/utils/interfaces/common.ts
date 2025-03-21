import React, { ReactNode } from 'react';

export interface IRouteModel {
    path: string;
    component: React.ElementType;
    children?: IChildRouteModel[];
    name?: string;
    index?: boolean;
}

export interface IChildRouteModel {
    path?: string;
    component: React.ElementType;
    index?: boolean;
    children?: IChildRouteModel[] | null;
}

export interface ISideBar {
    path?: string;
    label: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    children?: ISideBar[] | null;
}

export interface IBreadcrumb {
    to: string;
    title: string;
}

export interface IPagination extends IParamsPagination {
    lengthPage?: number;
}

export interface IParamsPagination {
    currentPage?: number;
    limitPage?: number;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    category?: string;
    price?: [number, number];
    colors?: string[];
    sizes?: string[];
}

export interface IMenuItem {
    key: string;
    label: ReactNode;
    icon?: string;
    children?: IMenuItem[];
}
