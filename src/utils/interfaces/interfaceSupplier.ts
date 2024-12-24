export interface ISupplier {
    id: string;
    supplierImage?: string;
    supplierName?: string;
    supplierCode: string;
    supplierPhone?: number;
    supplierEmail?: string;
    supplierAddress?: string;
    isTaking?: number[];
    dateDriver: Date;
    quantityImported?: number;
}

// export interface ITypeSupplier {
//     id?: string;
//     title: string;
// }
