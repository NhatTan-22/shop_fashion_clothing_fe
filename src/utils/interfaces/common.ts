import React from 'react';

export interface IRouteModel {
    path: string;
    component: React.ElementType;
    children?: IChildRouteModel[];
    name?: string;
    index?: boolean;
}

export interface IChildRouteModel {
    path: string;
    component: React.ElementType;
    index: boolean;
    children?: IChildRouteModel[];
}

export interface ISideBar {
    path: string;
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface IPagination extends IParamsPagination {
    lengthPage?: number;
}

export interface IParamsPagination {
    currentPage: number;
    limitPage?: number;
}
