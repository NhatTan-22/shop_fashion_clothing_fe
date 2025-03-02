// Libs
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
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
};

const cx = classNames.bind(styles);

const ItemProduct = (props: Props) => {
    //#region Destructuring Props
    const { product, titleAdd } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const navigate = useNavigate();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

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
            <div className={cx('boxImage')}>
                <div className={cx('imageProduct')}>
                    <img src={`${baseURL}/${product?.images[0]}`} alt={product?.name} />
                </div>
                <div className={cx('buttons')}>
                    <div className={cx('optionButtons')}>
                        <BaseButton
                            styleButton={ButtonStyleEnum.TEXT}
                            nextIcon={icons.heartIcon}
                            onClick={() => {
                                handleAddToWishlist(product?.slug);
                            }}
                        />
                        <BaseButton
                            styleButton={ButtonStyleEnum.TEXT}
                            nextIcon={icons.cartIcon}
                            onClick={() => {
                                handleDetailProduct(product.slug);
                            }}
                        />
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
            <Link to={`/products/details/${product.slug}`}>
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
    );
};

export default ItemProduct;
