// Libs
import React from 'react';
import classNames from 'classnames/bind';
import { DatePicker, List } from 'antd';
import { useTranslation } from 'react-i18next';
import Card from 'antd/es/card/Card';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './Dashboard.module.scss';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { dataSales, fashionSalesData } from '~/utils/constants/mockData';

type Props = {
    content?: string;
};

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);

const Dashboard = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    const data1 = [
        {
            icon: '🛍️',
            children: {
                data: '₹ 832',
                date: 'Total Orders',
            },
        },
        {
            icon: '💵',
            children: {
                data: '₹ 18,300',
                date: 'Total Revenue',
            },
        },
        {
            icon: '📊',
            children: {
                data: '₹ 868',
                date: 'Net Profit',
            },
        },
        {
            icon: '📦',
            children: {
                data: '₹ 17,432',
                date: 'Total Cost',
            },
        },
    ];

    const data2 = [
        {
            icon: '👗',
            children: {
                data: 868,
                date: 'Products in Stock',
            },
        },
        {
            icon: '🚚',
            children: {
                data: 200,
                date: 'Incoming Stock',
            },
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
            <div className={cx('rowDashBoard')}>
                <div className={cx('colOneDashBoard')}>
                    <div className={cx('headerTitle')}>
                        <h1>{t('Sales Overview')}</h1>
                    </div>
                    <List
                        className={cx('listDashBoard')}
                        grid={{ gutter: 24, sm: 1, lg: 2, xl: 3, xxl: 4 }}
                        dataSource={data1}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={item.icon} style={{ textAlign: 'center' }}>
                                    <div className={cx('description')}>
                                        <h3>{item.children.data}</h3>
                                        <div className='text-gray-400'>{item.children.date}</div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>

                <div className={cx('colTwoDashBoard')}>
                    <List
                        className={cx('listDashBoard')}
                        grid={{ gutter: 24, sm: 1, lg: 1, xl: 2, xxl: 2 }}
                        dataSource={data2}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={item.icon} style={{ textAlign: 'center' }}>
                                    <div className={cx('description')}>
                                        <h3>{item.children.data}</h3>
                                        <div className='text-gray-400'>{item.children.date}</div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
            <div className={cx('rowDashBoard')}>
                <div className={cx('colOneDashBoard')}>
                    <div className={cx('headerTitle')}>
                        <h1>{t('Purchase Overview')}</h1>
                    </div>
                    <List
                        className={cx('listDashBoard')}
                        grid={{ gutter: 24, sm: 1, lg: 2, xl: 3, xxl: 4 }}
                        dataSource={data1}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={item.icon} style={{ textAlign: 'center' }}>
                                    <div className={cx('description')}>
                                        <h3>{item.children.data}</h3>
                                        <div className='text-gray-400'>{item.children.date}</div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>

                <div className={cx('colTwoDashBoard')}>
                    <div className={cx('headerTitle')}>
                        <h1>{t('Product Summary')}</h1>
                    </div>
                    <List
                        className={cx('listDashBoard')}
                        grid={{ gutter: 24, sm: 1, lg: 1, xl: 2, xxl: 2 }}
                        dataSource={data2}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={item.icon} style={{ textAlign: 'center' }}>
                                    <div className={cx('description')}>
                                        <h3>{item.children.data}</h3>
                                        <div className='text-gray-400'>{item.children.date}</div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
            <div className='w-full grid grid-flow-col col-span-2 gap-5'>
                <div className='w-full bg-blue-chalk-100 p-3 rounded-lg'>
                    <div className='flex justify-between mb-5'>
                        <div className='text-xl font-bold mb-4'>Sales & Purchase</div>
                        <RangePicker picker='month' />
                    </div>
                    <ResponsiveContainer width={'100%'} height={200}>
                        <BarChart data={dataSales} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='month' />
                            <YAxis type='number' />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey='revenue' fill='#c083f8' />
                            <Bar dataKey='cost' fill='#76a9fa' />
                            <Bar dataKey='profit' fill='#ff7300' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className='w-full bg-blue-chalk-100 p-3 rounded-lg'>
                    <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
                    <ResponsiveContainer width={'100%'} height={200}>
                        <AreaChart data={fashionSalesData} margin={{ top: 0, right: 30, left: 0, bottom: -20 }}>
                            <defs>
                                <linearGradient id='colorSales' x1='0' y1='0' x2='0' y2='1'>
                                    <stop offset='5%' stopColor='#c083f8' stopOpacity={0.8} />
                                    <stop offset='95%' stopColor='#c083f8' stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey='month' />
                            <YAxis />
                            <CartesianGrid strokeDasharray='3 3' />
                            <Tooltip />
                            <Legend />
                            <Area
                                type='monotone'
                                dataKey='revenue'
                                stroke='#c083f8'
                                fillOpacity={1}
                                fill='url(#colorSales)'
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
