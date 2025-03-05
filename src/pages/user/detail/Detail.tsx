// Libs
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Image, InputNumber, message, Rate, Tabs, TabsProps, Tag, Typography } from 'antd';
// Components, Layouts, Pages
import { Advertisement, Breadcrumb, IconSVG, ItemProduct, Review } from '~/components';
// Others
import { baseURL } from '~/utils/constants/env';
import { useAppDispatch } from '~/redux/hooks';
import { LoadingContext } from '~/context';
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { getDetailProductThunk } from '~/thunks/product/productThunk';
// Styles, Images, icons
import styles from './Detail.module.scss';
import { icons } from '~/assets';

type Props = {
    // content?: string;
};

const cx = classNames.bind(styles);

const Detail = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const params = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [detail, setDetail] = useState<IProduct>();
    const [relate, setRelate] = useState<IProduct[]>([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        loadingContext?.show();
        try {
            if (params.slug) {
                dispatch(getDetailProductThunk(params.slug))
                    .unwrap()
                    .then((response) => {
                        if (response) {
                            setDetail(response.data);
                            setRelate(response.relate);
                            setSelectedImage(response.data.images[0]);
                        }
                    })
                    .catch((error) => {
                        message.error(error.message);
                    })
                    .finally(() => {
                        loadingContext?.hide();
                    });
            }
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error(String(error));
            }
        }
    }, [params.slug]);
    //#endregion Implement Hook

    //#region Create Variables
    const detailBreadcrumbs = [
        {
            to: '/products',
            title: `${t('user_title_products_navigation')}`,
        },
        {
            to: '',
            title: `${t('user_title_detail_navigation')}`,
        },
        {
            to: '',
            title: `${params.slug}`,
        },
    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `${t('user_detail_description_products_label')}`,
            children: <Typography.Paragraph>{detail?.description}</Typography.Paragraph>,
        },
        {
            key: '2',
            label: `${t('user_detail_additional_information_products_label')}`,
            children: (
                <>
                    {detail?.stock && detail?.stock > 0 && (
                        <div className='flex items-center gap-2'>
                            <Typography.Text strong className='text-xl'>
                                {t('user_detail_stock_products_label')}
                            </Typography.Text>
                            <span className='text-base'>{detail?.stock}</span>
                        </div>
                    )}

                    {detail?.colors && detail?.colors.length > 0 && (
                        <div className='flex items-center gap-2'>
                            <Typography.Text className='text-xl' strong>
                                {t('user_detail_color_products_label')}
                            </Typography.Text>
                            <div className='flex gap-1 text-base mt-2'>
                                {detail?.colors.reduce((acc: JSX.Element[], color: string, index: number) => {
                                    if (index > 0) acc.push(<span key={`comma-${index}`}>,</span>);

                                    acc.push(<label key={color}>{color}</label>);
                                    return acc;
                                }, [])}
                            </div>
                        </div>
                    )}

                    {detail?.sizes && detail?.sizes.length > 0 && (
                        <div className='flex items-center gap-2'>
                            <Typography.Text strong className='text-xl'>
                                {t('user_detail_size_products_label')}
                            </Typography.Text>
                            <div className='flex gap-1 text-base mt-2'>
                                {detail?.sizes.reduce(
                                    (acc: JSX.Element[], size: string, index: number, array: string[]) => {
                                        if (index > 0) acc.push(<span key={`comma-${index}`}>,</span>);

                                        acc.push(<label key={size}>{size}</label>);
                                        return acc;
                                    },
                                    []
                                )}
                            </div>
                        </div>
                    )}
                </>
            ),
        },
        {
            key: '3',
            label: `${t('user_detail_reviews_products_label')}`,
            children: <Review />,
        },
    ];
    //#endregion Create Variables

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div id='detailComponent' className={cx('mainDetail')}>
            <Breadcrumb breadcrumbs={detailBreadcrumbs} />
            <div className={cx('swapperContact')}>
                <div className={cx('rowDetailProduct')}>
                    <div className={cx('colImageProduct')}>
                        <div className='w-[500px] h-[500px] border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer mb-5'>
                            <Image
                                className={cx('imageContainer')}
                                src={`${baseURL}/${selectedImage}`}
                                alt={detail?.name}
                            />
                        </div>
                        <div>
                            {detail?.images && detail.images.length > 0 && (
                                <div className={cx('container')}>
                                    {detail?.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className={cx('thumbnailContainer', { selected: selectedImage === img })}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <Image
                                                src={`${baseURL}/${img}`}
                                                alt={detail?.name}
                                                className='w-full h-full object-cover'
                                                preview={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('colInformationProduct')}>
                        <div>
                            <Typography.Title className={cx('titleNameProduct')}>{detail?.name}</Typography.Title>
                            {/* <Typography.Text type='secondary'>Girls Pink Moana Printed Dress</Typography.Text> */}
                            <div className='flex items-center gap-2 mt-2'>
                                <Rate allowHalf value={Number(detail?.ratings)} disabled />
                                <Typography.Text type='secondary'>{`(${detail?.ratings} Reviews)`}</Typography.Text>
                            </div>
                            <div className={cx('priceProduct')}>
                                <Typography.Title level={3}>{`$${detail?.pricing.promotionPrice}`}</Typography.Title>
                                <Typography.Text delete type='secondary' className='text-xl'>
                                    {`$${detail?.pricing.price}`}
                                </Typography.Text>
                            </div>
                            <Typography.Paragraph className='text-base' type='secondary'>
                                {detail?.description}
                            </Typography.Paragraph>
                            <Typography.Text className='text-xl' strong>
                                {t('user_detail_color_products_label')}
                            </Typography.Text>
                            <div className='flex gap-2 mt-2'>
                                {detail?.colors.map((color) => (
                                    <Tag
                                        key={color}
                                        color={color}
                                        style={{ border: `2px solid #000` }}
                                        className={cx('colorOption', { selected: selectedColor === color })}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                            <Typography.Text strong className='mt-4 block text-xl'>
                                {t('user_detail_size_products_label')}
                            </Typography.Text>
                            <div className='flex gap-2 mt-2'>
                                {detail?.sizes.map((size) => (
                                    <Button
                                        key={size}
                                        type={selectedSize === size ? 'primary' : 'default'}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                            <Typography.Text strong className='mt-4 block text-xl'>
                                {t('user_detail_stock_products_label')} <span>{detail?.stock}</span>
                            </Typography.Text>

                            <div className='flex items-center gap-4 mt-6'>
                                <InputNumber
                                    size='large'
                                    min={1}
                                    max={detail?.stock}
                                    defaultValue={quantity}
                                    onChange={(value) => setQuantity(value as number)}
                                    changeOnWheel
                                />
                                <Button size='large' type='primary' className='bg-black text-white px-8'>
                                    {t('common_buy_product')}
                                </Button>
                                <Button size='large' icon={<IconSVG IconComponent={icons.heartIcon} />} />
                            </div>
                        </div>
                        <div>
                            <Tag
                                bordered={false}
                                style={{ padding: 8 }}
                                color={`${detail?.availability === 'IN_STOCK' ? 'green' : 'red'}`}
                            >
                                {detail?.availability}
                            </Tag>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-10 mt-10 mb-[-16px]'>
                    <div>
                        <Tabs defaultActiveKey='1' items={items} />
                    </div>
                    <div>
                        <Typography.Title>{t('user_detail_relate_products_title')}</Typography.Title>
                        <div className={cx('relatedProducts')}>
                            {relate?.map((product: IProduct) => (
                                <ItemProduct titleAdd='Buy Now' product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Advertisement />
        </div>
    );
};

export default Detail;
