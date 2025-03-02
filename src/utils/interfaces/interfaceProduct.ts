export interface IProduct extends IAddProduct {
    _id: string;
    slug: string;
    ratings: number;
    status: string;
    availability: string;
    brand?: string;
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
    gender?: string;
    supplier: string;
}
