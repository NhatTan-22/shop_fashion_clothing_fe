export interface IOrder extends IAddOrder {
    _id: string;
    sku: string;
    status: string;
    paymentStatus: string;
    shippingId: Object;
    paymentMethod: string;
}

export interface IAddOrder {
    userId: Object;
    address: IAddress;
    products: IProducts[];
    totalPrice: number;
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
    email: string;
    address: string;
}
