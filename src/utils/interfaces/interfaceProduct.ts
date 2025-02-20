export interface IProduct extends IAddProduct {
    _id: Object;
    sku: string;
    ratings: number;
    status: string;
    availability: string;
}

export interface IAddProduct {
    images: string[];
    name: string;
    description: string;
    category: string;
    pricing: {
        price: number;
        promotionPrice: number;
        discountPercentage: number;
    };
    stock: number;
    sizes: string[];
    colors: string[];
    brand: string;
    gender?: string;
    supplier: string;
}

// export type ISupplierCreate = Omit<IProduct, '_id'>;
