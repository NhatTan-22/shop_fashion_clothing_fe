export interface ICategory extends IAddCategory {
    _id: string;
}

export interface IAddCategory {
    image: string;
    name: string;
    description: string;
}
