export interface IBrand extends IAddBrand {
    _id: object;
    slug: string;
}

export interface IAddBrand {
    name: string;
    logo: string;
    description: string;
    country: string;
    website: string;
    suppliers: object[] | string[];
}
