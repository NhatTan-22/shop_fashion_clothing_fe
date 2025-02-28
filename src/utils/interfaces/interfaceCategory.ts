export interface ICategory extends IAddCategory {
    _id: Object;
}

export interface IAddCategory {
    image: string;
    name: string;
    description: string;
}
