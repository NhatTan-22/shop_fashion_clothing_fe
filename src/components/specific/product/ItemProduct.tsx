// Libs
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Image, Rate } from 'antd';
// Components, Layouts, Pages
import { BaseButton, IconSVG } from '~/components';
// Others
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { baseURL } from '~/utils/constants/env';
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './ItemProduct.module.scss';
import { icons } from '~/assets';

type Props = {
    product: IProduct;
    titleAdd: string;
    styleItem?: boolean;
};

const cx = classNames.bind(styles);

const ItemProduct = (props: Props) => {
    const { product, titleAdd, styleItem = true } = props;

    const navigate = useNavigate();

    //#region Handle Function
    function handleAddToWishlist(slug: string) {
        console.log('Add to wishlist: ', slug);
    }

    function handleDetailProduct(slug: string) {
        navigate(`/products/detail/${slug}`);
    }

    function handleBuyProduct(slug: string) {
        navigate(`/products/detail/${slug}`);
    }
    //#endregion Handle Function

    return (
        <div id='itemProductComponent' className={cx('itemProduct')} key={product?.slug}>
            {styleItem ? (
                <div className={cx('boxGridProduct')}>
                    <div className={cx('boxImage')}>
                        <div className={cx('imageProduct')}>
                            <Image
                                width={300}
                                height={200}
                                src={`${baseURL}/${product?.images[0]}`}
                                alt={product?.name}
                            />
                        </div>
                        <div className={cx('buttons')}>
                            <div className={cx('optionButtons')}>
                                <Button
                                    style={{ backgroundColor: '#f5ebfa' }}
                                    shape='circle'
                                    type='text'
                                    onClick={() => {
                                        handleAddToWishlist(product?.slug);
                                    }}
                                >
                                    <IconSVG IconComponent={icons.heartIcon} />
                                </Button>
                                <Button
                                    style={{ backgroundColor: '#f5ebfa' }}
                                    shape='circle'
                                    type='text'
                                    onClick={() => {
                                        handleDetailProduct(product?.slug);
                                    }}
                                >
                                    <IconSVG IconComponent={icons.cartIcon} />
                                </Button>
                            </div>
                            <BaseButton
                                className={cx('buttonAddCart')}
                                styleButton={ButtonStyleEnum.PRIMARY}
                                onClick={() => {
                                    handleBuyProduct(product.slug);
                                }}
                                nameButton={`${titleAdd}`}
                            />
                        </div>
                    </div>
                    <Link to={`/products/detail/${product.slug}`}>
                        <div className={cx('description')}>
                            <h1 className={cx('nameProduct')}>{product?.name}</h1>
                            <h6 className={cx('tileProduct')}>{product?.description}</h6>
                            <div className={cx('price')}>
                                <h4 className={cx('discountPriceProduct')}>
                                    <IconSVG IconComponent={icons.dollarIcon} />
                                    {`${product?.pricing.promotionPrice}`}
                                </h4>
                                <h4 className={cx('priceProduct')}>
                                    <IconSVG IconComponent={icons.dollarIcon} />
                                    {`${product?.pricing.price}`}
                                </h4>
                            </div>
                        </div>
                    </Link>
                </div>
            ) : (
                <div className={cx('boxListProduct')}>
                    <div className={cx('boxImage')}>
                        <div className={cx('imageProduct')}>
                            <Image
                                width='100%'
                                height={300}
                                style={{ objectFit: 'cover' }}
                                src={`${baseURL}/${product?.images[0]}`}
                                alt={product?.name}
                            />
                        </div>
                        <div className={cx('buttons')}>
                            <div className={cx('optionButtons')}></div>
                        </div>
                    </div>
                    <div className={cx('description')}>
                        <h1 className='font-bold text-3xl'>{product?.name}</h1>
                        <Rate value={Number(product?.ratings)} disabled />
                        <h6 className={cx('tileProduct')}>{product?.description}</h6>
                        <div className={cx('price')}>
                            <h4 className={cx('discountPriceProduct')}>
                                <IconSVG IconComponent={icons.dollarIcon} />
                                {`${product?.pricing.promotionPrice}`}
                            </h4>
                            <h4 className={cx('priceProduct')}>
                                <IconSVG IconComponent={icons.dollarIcon} />
                                {`${product?.pricing.price}`}
                            </h4>
                        </div>
                        <div className={cx('buttonsList')}>
                            <Button
                                type='primary'
                                size='large'
                                onClick={() => {
                                    handleBuyProduct(product.slug);
                                }}
                            >{`${titleAdd}`}</Button>
                            <Button
                                size='large'
                                type='text'
                                onClick={() => {
                                    handleAddToWishlist(product?.slug);
                                }}
                            >
                                <IconSVG IconComponent={icons.heartIcon} />
                            </Button>
                            <Button
                                size='large'
                                type='text'
                                onClick={() => {
                                    handleDetailProduct(product?.slug);
                                }}
                            >
                                <IconSVG IconComponent={icons.cartIcon} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemProduct;
