export interface ISupplier {
    supplierCode: string;
    supplierName: string;
    supplierImage: File | string | null;
    supplierPhone: number;
    supplierEmail: string;
    supplierAddress: string;
    productCode: string;
    isTaking: number[];
    quantityImported: number;
}
