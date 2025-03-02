// Libs
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Checkbox, Menu, Radio, Select, Slider } from 'antd';
import { Link, Outlet } from 'react-router-dom';
// Components, Layouts, Pages
import { Advertisement, BaseButton, Breadcrumb, IconSVG } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { IMenuItem } from '~/utils/interfaces/common';
// Styles, Images, icons
import styles from './ProductsPage.module.scss';
import { icons } from '~/assets';
import { subBanners } from '~/utils/constants/mockData';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const productBreadcrumbs = [
    {
        to: '/products',
        title: 'user_title_products_navigation',
    },
];

const ProductsPage = (props: Props) => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [valuePrice, setValuePrice] = useState<number[]>([0, 0]);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [products, setProducts] = useState<any[]>([]);
    //#endregion Declare State

    //#region Implement Hook
    const items: IMenuItem[] = [
        {
            key: 'category',
            label: <b>{t('user_sidebar_category_label_product')}</b>,
            children: [
                {
                    key: 'Men',
                    label: (
                        <div className={cx('itemCategory')}>
                            <Checkbox style={{ accentColor: 'red' }}>Men</Checkbox>
                            <span>{`(4)`}</span>
                        </div>
                    ),
                },
                {
                    key: 'Women',
                    label: (
                        <div className={cx('itemCategory')}>
                            <Checkbox>Women</Checkbox>
                            <span>{`(20)`}</span>
                        </div>
                    ),
                },
            ],
        },
        {
            key: 'price',
            label: <b>{t('user_sidebar_price_label_product')}</b>,
            children: [
                {
                    key: 'tile-price-slider',
                    label: (
                        <div className={cx('itemPrice')}>
                            <h1>{`Price: ${valuePrice[0]} - ${valuePrice[1]}`}</h1>
                            <BaseButton
                                styleButton={ButtonStyleEnum.TEXT}
                                nameButton={`${t('common_clear')}`}
                                onClick={() => setValuePrice([0, 0])}
                            />
                        </div>
                    ),
                },
                {
                    key: 'price-slider',
                    label: (
                        <Slider
                            className={cx('sliderPrice')}
                            range={{ minCount: 0, maxCount: 100 }}
                            onChange={(newValue: number[]) => setValuePrice(newValue)}
                            value={valuePrice}
                        />
                    ),
                },
            ],
        },
        {
            key: 'color',
            label: <b>{t('user_sidebar_color_label_product')}</b>,
            children: [
                { key: 'Red', label: <Checkbox>Red</Checkbox> },
                { key: 'Bue', label: <Checkbox>Bue</Checkbox> },
            ],
        },
        {
            key: 'size',
            label: <b>{t('user_sidebar_size_label_product')}</b>,
            children: [
                {
                    key: '1',
                    label: (
                        <Radio value='S' checked={selectedSize === 'S'} onChange={handleSizeChange}>
                            S
                        </Radio>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Radio value='M' checked={selectedSize === 'M'} onChange={handleSizeChange}>
                            M
                        </Radio>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <Radio value='L' checked={selectedSize === 'L'} onChange={handleSizeChange}>
                            L
                        </Radio>
                    ),
                },
                {
                    key: '4',
                    label: (
                        <Radio value='XL' checked={selectedSize === 'XL'} onChange={handleSizeChange}>
                            XL
                        </Radio>
                    ),
                },
                {
                    key: '5',
                    label: (
                        <Radio value='XXL' checked={selectedSize === 'XXL'} onChange={handleSizeChange}>
                            XXL
                        </Radio>
                    ),
                },
            ],
        },
    ];

    useEffect(() => {
        setProducts(subBanners);
    }, [subBanners]);
    //#endregion Implement Hook

    //#region Handle Function
    const handleMenuClick = (e: { key: string }) => {
        const key = e.key;
        setSelectedKeys((prev) => {
            if (prev.includes(key)) {
                return prev.filter((k) => k !== key);
            } else {
                return [...prev, key];
            }
        });
    };

    // console.log(selectedKeys);

    function handleSizeChange(e: any) {
        setSelectedSize(e.target.value);
    }

    //#endregion Handle Function

    return (
        <div id='productsPage' className={cx('mainProductsPage')}>
            <Breadcrumb breadcrumbs={productBreadcrumbs} />
            <div className={cx('swapperContact')}>
                <div className={cx('sideBarProduct')}>
                    <Menu
                        className={cx('custom-menu-global')}
                        items={items}
                        mode='inline'
                        inlineCollapsed={false}
                        onClick={handleMenuClick}
                    />
                </div>
                <div className={cx('contentProduct')}>
                    <div className={cx('headerProduct')}>
                        <div className={cx('colLeftHeaderProduct')}>
                            <Link to={`/products`}>
                                <IconSVG IconComponent={icons.gridIcon} />
                            </Link>
                            <Link to={`/products/list`}>
                                <IconSVG IconComponent={icons.listItemIcon} />
                            </Link>
                            <span>{`Showing 1 - 16 of 20 results`}</span>
                        </div>
                        <div className={cx('colRightHeaderProduct')}>
                            <Select
                                defaultValue='0'
                                variant='borderless'
                                style={{ width: 200 }}
                                options={[
                                    { value: '0', label: `${t('user_short_title_product')}` },
                                    { value: '1', label: `${t('user_short_asc_abc_product')}` },
                                    { value: '2', label: `${t('user_short_desc_abc_product')}` },
                                    { value: '3', label: `${t('user_short_asc_price_product')}` },
                                    { value: '4', label: `${t('user_short_desc_price_product')}` },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={cx('listProduct')}>
                        <Outlet context={{ products }} />
                    </div>
                </div>
            </div>
            <Advertisement />
        </div>
    );
};

export default ProductsPage;
