// Libs
import React from 'react';
import classNames from 'classnames/bind';
// Components, Layouts, Pages
import BaseTable from '~/components/specific/table/BaseTable';
// Others
import { Columns, DataType } from '~/utils/interfaces/interfaceTable';
// Styles, Images, icons
import styles from './Dashboard.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Dashboard = (props: Props) => {
    interface User {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: Columns<User, DataType<User>>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, record) => (
                <div>
                    {record.tags.map((tag) => {
                        return <p>{tag}</p>;
                    })}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: () => (
                <div>
                    <a>Invite</a>
                    <a>Delete</a>
                </div>
            ),
        },
    ];

    const data: User[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <div className={cx('dashBoard')}>
            <BaseTable columns={columns} dataSource={data} />
        </div>
    );
};

export default Dashboard;
