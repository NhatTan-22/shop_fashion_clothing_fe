export interface IInventory {
    id: string;
    product_name?: string;
    buying_price?: number;
    quantity?: number;
    threshold_value?: number;
    expiry_date?: string;
    availability?: string;
}