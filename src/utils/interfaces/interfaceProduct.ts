export interface IProduct {
    id: string;
    productCode?: string;
    productName?: string;
    productImage?: string;
    description?: string;
    supplierCode: string;
    status: boolean;
    price?: IPrice;
    variants: IVariant[];
    category: string;
}

export interface IPrice {
    sellingPrice?: number;
    importPrice?: number;
    promotionPrice?: number;
}

export interface IVariant {
    image: [string];
    color: string;
    sizes: ISizeQuantity[];
}

export interface ISizeQuantity {
    size: string;
    storeQuantity?: number;
    importQuantity?: number;
    sellingQuantity?: number;
}
