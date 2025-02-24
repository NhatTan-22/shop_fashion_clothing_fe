type ColumnAlign = "left" | "center" | "right";

export interface Columns<T, DataType> {
    title: string;
    dataIndex: string;
    key: string;
    sortable?: (a: T, b: T) => boolean;
    render?: (text: T, record: DataType) => React.ReactNode;
    align?: ColumnAlign;
}

export type DataType<T extends object> = T & {
    key?: string;
};
