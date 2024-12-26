export interface ISupplier {
    id: string;
    supplierImage?: string;
    supplierName?: string;
    supplierCode: string;
    supplierPhone?: number;
    supplierEmail?: string;
    supplierAddress?: string;
    productCode?: string;
    isTaking?: [number];
    quantityImported?: number;
}
