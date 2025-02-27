// Libs
import React from 'react';
import classNames from 'classnames/bind';
import { List } from 'antd';
import { useTranslation } from 'react-i18next';
import Card from 'antd/es/card/Card';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './Dashboard.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Dashboard = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    const data = [
        {
            title: `${t('admin_inventory_categories_title')}`,
            children: {
                data: 14,
                date: 'Last 7 days',
            },
        },
        {
            title: `${t('admin_inventory_total_products_title')}`,
            children: [
                {
                    data: 868,
                    date: `Last ${7} days`,
                },
                {
                    data: `$${25000}`,
                    date: `Revenue`,
                },
            ],
        },
        {
            title: `${t('admin_inventory_top_selling_title')}`,
            children: [
                {
                    data: 5,
                    date: `Last ${7} days`,
                },
                {
                    data: `$${25000}`,
                    date: `Cost`,
                },
            ],
        },
        {
            title: `${t('admin_inventory_low_stocks_title')}`,
            children: [
                {
                    data: 12,
                    date: `Ordered`,
                },
                {
                    data: `${2}`,
                    date: `Not in stock`,
                },
            ],
        },
    ];
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div id='dashBoardPage' className={cx('mainDashBoard')}>
            <div className={cx('boxBashBoard')}>
                <div className={cx('headerTitle')}>
                    <h1>{t('admin_overall_inventory_header')}</h1>
                </div>
                <List
                    className={cx('listDashBoard')}
                    grid={{ gutter: 24, sm: 1, lg: 2, xl: 3, xxl: 4 }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={item.title} style={{ textAlign: 'center' }}>
                                {Array.isArray(item.children) ? (
                                    <div className={cx('columnOverall')}>
                                        {item.children.map((itemChildren, index) => (
                                            <div key={index} className={cx('description')}>
                                                <h3>{itemChildren.data}</h3>
                                                <span>{itemChildren.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={cx('description')}>
                                        <h3>{item.children.data}</h3>
                                        <div className='text-gray-400'>{item.children.date}</div>
                                    </div>
                                )}
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
            <div className='grid grid-flow-col gap-5'>
                <div className='grid grid-flow-col col-span-7 bg-blue-chalk-100 rounded-lg'></div>
                <div className='grid grid-flow-col col-span-5 bg-blue-chalk-100 rounded-lg'></div>
            </div>
            <div className='grid grid-flow-col gap-5'>
                <div className='grid grid-flow-col col-span-7 bg-blue-chalk-100 rounded-lg'></div>
                <div className='grid grid-flow-col col-span-5 bg-blue-chalk-100 rounded-lg'></div>
            </div>
            <div className='bg-blue-chalk-100 grid grid-flow-row'>

            </div>
        </div>
    );
};

export default Dashboard;
