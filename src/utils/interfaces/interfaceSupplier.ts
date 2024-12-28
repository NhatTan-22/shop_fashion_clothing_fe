export interface ISupplier {
    id: string;
    supplierCode: string;
    supplierName?: string;
    supplierImage?: string;
    supplierPhone?: number;
    supplierEmail?: string;
    supplierAddress?: string;
    productCode?: string;
    isTaking?: [number];
    quantityImported?: number;
}
