export interface IOrder extends IAddOrder {
    _id?: string;
    sku: string;
    status: string;
    shippingId: string | object;
    paymentStatus: string;
}

export interface IAddOrder {
    userId: string | object;
    address: IAddress;
    products: IProducts[];
    totalPrice: number;
    paymentMethod: string;
    discount: string;
}

export interface IProducts {
    productId: string;
    image: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
}

export interface IAddress {
    nameCustomer: string;
    phone: string;
    address: string;
}
