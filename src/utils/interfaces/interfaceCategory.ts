export interface ICategory extends IAddCategory {
    _id: Object;
}

export interface IAddCategory {
    logo: string;
    name: string;
    description: string;
}
