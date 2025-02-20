export interface ISupplier extends IAddSupplier {
    _id: Object;
}

export interface IAddSupplier {
    supplierName: String;
    contactPerson: String;
    image: String;
    email: String;
    phone: String;
    address: String;
    categories: Object[];
    orderQuantity: Number;
    restockStatus: String;
    expectedArrivalDate: Date;
    lastRestockDate?: Date;
}
