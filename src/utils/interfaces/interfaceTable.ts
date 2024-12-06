export interface Columns<T, DataType> {
    title: string;
    dataIndex: string;
    key: string;
    sortable?: (a: T, b: T) => boolean;
    render?: (text: T, record: DataType) => React.ReactNode;
}

export type DataType<T extends object> = T & {
    key?: string;
};
