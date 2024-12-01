// Libs
import classNames from 'classnames/bind';
import { useState } from 'react';
// Components, Layouts, Pages
// Others
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
// Styles, Images, icons
import styles from './BaseTable.module.scss';

type Props<T extends object> = {
    columns: Columns<T, DataType<T>>[];
    dataSource: DataType<T>[];
};

const cx = classNames.bind(styles);

const BaseTable = <T extends object>(props: Props<T>) => {
    //#region Destructuring Props
    const { columns, dataSource } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const [source, setSource] = useState<DataType<T>[]>(dataSource ?? []);
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div id='baseTableComponent' className={cx('baseTable')}>
            <table>
                <thead>
                    <tr>
                        {columns?.map((column, index) => {
                            return <th key={`${column.key}_${index}`}>{column.title}</th>;
                        })}
                    </tr>
                </thead>
                <tbody className={cx('bodyBaseTable')}>
                    {source?.map((dataTable, index) => {
                        return (
                            <tr key={`${dataTable.key}_${index}`}>
                                {columns?.map((column, index) => {
                                    const value = dataTable[column.dataIndex as keyof typeof dataTable];
                                    return column.render ? (
                                        <td key={`${column.key}_${index}`}>
                                            {column.render(value as T, dataTable as DataType<T>)}
                                        </td>
                                    ) : (
                                        <td key={`${column.key}_${index}`}>{`${value}`}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BaseTable;
