export interface ISupplier extends IAddSupplier {
    _id: string;
    slug: string;
    sku: string;
    restockStatus: string;
}

export interface IAddSupplier {
    supplierName: string;
    contactPerson: string;
    image: string | File | null;
    email: string;
    phone: string;
    address: string;
    categories: object[] | string[];
    orderQuantity: number;
    importPrice: number;
    expectedArrivalDate: Date | string;
    lastRestockDate: Date | string;
}
