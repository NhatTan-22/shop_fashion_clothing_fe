// Libs
import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Menu, Radio, Select, Slider, Tag, Typography } from 'antd';
import { debounce } from 'lodash';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
// Components, Layouts, Pages
import { Advertisement, BaseButton, Breadcrumb, IconSVG, UseFetchProducts } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { IMenuItem, IParamsPagination } from '~/utils/interfaces/common';
// Styles, Images, icons
import styles from './ProductsPage.module.scss';
import { icons } from '~/assets';

const cx = classNames.bind(styles);

const productBreadcrumbs = [
    {
        to: '/products',
        title: 'user_title_products_navigation',
    },
];

const ProductsPage = () => {
    //#region Destructuring Props
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState<IParamsPagination>({
        currentPage: Number(searchParams.get('currentPage')) || 1,
        limitPage: Number(searchParams.get('limitPage')) || 12,
        sortBy: searchParams.get('sortBy') || 'createdAt',
        order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
        category: searchParams.get('category') || '',
        price: [
            searchParams.get('price_m in') !== null ? Number(searchParams.get('price_min')) || 0 : 0,
            searchParams.get('price_max') !== null ? Number(searchParams.get('price_max')) || 9999999 : 9999999,
        ],
        colors: searchParams.getAll('colors'),
        sizes: searchParams.getAll('sizes'),
    });
    const [tempPrice, setTempPrice] = useState(filters.price || [0, 100]);
    //#endregion Declare State

    //#region Implement Hook
    const { products, categories, colors, sizes, pagination } = UseFetchProducts(filters);
    //#endregion Implement Hook

    //#region Create Variables
    const items: IMenuItem[] = [
        {
            key: 'search',
            label: (
                <div className='flex items-center justify-between gap-2'>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        {t('_user_sidebar_product')}
                    </Typography.Title>
                    <Button type='text' onClick={clearFilters}>
                        {t('common_clear')}
                    </Button>
                </div>
            ),
        },
        {
            key: 'category',
            label: <b>{t('user_sidebar_category_label_product')}</b>,
            children: categories.map((category) => ({
                key: category._id,
                label: (
                    <div className={cx('itemCategory')}>
                        <Radio
                            checked={filters.category === category._id}
                            onChange={() => handleFilterChange('category', category._id)}
                        >
                            {category.name}
                        </Radio>
                        <span>{`(4)`}</span>
                    </div>
                ),
            })),
        },
        {
            key: 'price',
            label: <b>{t('user_sidebar_price_label_product')}</b>,
            children: [
                {
                    key: 'tile-price-slider',
                    label: (
                        <div className={cx('itemPrice')}>
                            <h1>{`Price: ${tempPrice[0]} - ${tempPrice[1]}`}</h1>
                            <BaseButton
                                styleButton={ButtonStyleEnum.TEXT}
                                nameButton={`${t('common_clear')}`}
                                onClick={() => setTempPrice([0, 9999999])}
                            />
                        </div>
                    ),
                },
                {
                    key: 'price-slider',
                    label: (
                        <Slider
                            range
                            min={0}
                            max={999999}
                            step={100}
                            value={tempPrice}
                            onChange={(value) => setTempPrice(value)}
                            onAfterChange={(value) => handleFilterChange('price', value)}
                        />
                    ),
                },
            ],
        },
        {
            key: 'color',
            label: <b>{t('user_sidebar_color_label_product')}</b>,
            children: colors.map((color) => ({
                key: color,
                label: (
                    <Checkbox
                        checked={(filters.colors ?? []).includes(color)}
                        onChange={(e) =>
                            handleFilterChange(
                                'colors',
                                e.target.checked
                                    ? [...(filters.colors ?? []), color]
                                    : (filters.colors ?? []).filter((c) => c !== color)
                            )
                        }
                    >
                        <Tag color={color}>{color}</Tag>
                    </Checkbox>
                ),
            })),
        },
        {
            key: 'size',
            label: <b>{t('user_sidebar_size_label_product')}</b>,
            children: sizes.map((size) => ({
                key: size,
                label: (
                    <Checkbox
                        checked={(filters.sizes ?? []).includes(size)}
                        onChange={(e) =>
                            handleFilterChange(
                                'sizes',
                                e.target.checked
                                    ? [...(filters.sizes ?? []), size]
                                    : (filters.sizes ?? []).filter((s) => s !== size)
                            )
                        }
                    >
                        <Typography.Text>{size}</Typography.Text>
                    </Checkbox>
                ),
            })),
        },
    ];
    //#endregion Create Variables

    //#region Handle Function
    const updateFilters = useCallback(
        debounce((newFilters: Partial<IParamsPagination>) => {
            setFilters((prev) => {
                const updatedFilters = { ...prev, ...newFilters };
                const params = new URLSearchParams();

                if (updatedFilters.currentPage !== 1) {
                    params.set('currentPage', String(updatedFilters.currentPage));
                }

                if (updatedFilters.limitPage !== 12) {
                    params.set('limitPage', String(updatedFilters.limitPage));
                }

                if (updatedFilters.sortBy && updatedFilters.sortBy !== 'createdAt') {
                    params.set('sortBy', updatedFilters.sortBy);
                }

                if (updatedFilters.order) {
                    params.set('order', updatedFilters.order);
                }

                if (updatedFilters.category) {
                    params.set('category', updatedFilters.category);
                }

                if (updatedFilters.price && (updatedFilters.price[0] !== 0 || updatedFilters.price[1] !== 9999999)) {
                    params.set('price_min', String(updatedFilters.price[0]));
                    params.set('price_max', String(updatedFilters.price[1]));
                }

                if (updatedFilters.colors?.length) {
                    params.set('colors', updatedFilters.colors.join(','));
                }

                if (updatedFilters.sizes?.length) {
                    params.set('sizes', updatedFilters.sizes.join(','));
                }

                setSearchParams(params);
                return updatedFilters;
            });
        }, 1000),
        [setSearchParams]
    );

    const handleFilterChange = (key: keyof IParamsPagination, value: any) => {
        updateFilters({ [key]: value });
    };

    const handleSortChange = (value: string) => {
        const [sortBy, order] = value.split('_');
        const validOrder = order === 'asc' || order === 'desc' ? order : 'desc';
        updateFilters({ sortBy, order: validOrder });
    };

    function clearFilters() {
        debounceClear();
    }

    const debounceClear = useCallback(
        debounce(() => {
            setFilters({
                currentPage: 1,
                limitPage: 12,
                sortBy: 'createdAt',
                order: 'desc',
                category: '',
                price: [0, 9999999],
                colors: [],
                sizes: [],
            });

            setSearchParams({});
        }, 1000),
        [setSearchParams]
    );
    //#endregion Handle Function

    return (
        <div id='productsPage' className={cx('mainProductsPage')}>
            <Breadcrumb breadcrumbs={productBreadcrumbs} />
            <div className={cx('swapperContact')}>
                <div className={cx('sideBarProduct')}>
                    <Menu className={cx('custom-menu-global')} items={items} mode='inline' inlineCollapsed={false} />
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
                                defaultValue='createdAt_desc'
                                variant='borderless'
                                style={{ width: 200 }}
                                onChange={handleSortChange}
                                options={[
                                    { value: 'createdAt_desc', label: `${t('user_short_title_product')}` },
                                    { value: 'name_asc', label: `${t('user_short_asc_abc_product')}` },
                                    { value: 'name_desc', label: `${t('user_short_desc_abc_product')}` },
                                    { value: 'price_asc', label: `${t('user_short_asc_price_product')}` },
                                    { value: 'price_desc', label: `${t('user_short_desc_price_product')}` },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={cx('listProduct')}>
                        <Outlet context={{ products, pagination, updateFilters }} />
                    </div>
                </div>
            </div>
            <Advertisement />
        </div>
    );
};

export default ProductsPage;
