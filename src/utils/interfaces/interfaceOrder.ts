export interface IOrder extends IAddOrder {
    _id: Object;
    sku: string;
    status: string;
    paymentStatus: string;
    shippingId: Object;
}

export interface IAddOrder {
    userId: Object;
    products: [
        {
            productId: object;
            image: string;
            name: string;
            color: string;
            size: string;
            quantity: number;
            price: number;
        }
    ];
    totalPrice: number;
    discount: Object;
}
