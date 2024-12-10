export interface IInventory {
    id: string;
    product_name?: string;
    buying_price?: number;
    quantity?: number;
    thresholdValue?: number;
    expiryDate?: string;
    availability?: string;
}