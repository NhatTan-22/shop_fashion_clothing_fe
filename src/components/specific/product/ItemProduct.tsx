// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './ItemProduct.module.scss';
import { BaseButton, IconSVG } from '~/components';
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { Link } from 'react-router-dom';
import { icons, images } from '~/assets';

type Props = {
    key?: number;
    product: any;
};

const cx = classNames.bind(styles);

const ItemProduct = (props: Props) => {
    //#region Destructuring Props
    const { key, product } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
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
        <div id='itemProductComponent' className={cx('itemProduct')} key={key}>
            <div className={cx('boxImage')}>
                <div className={cx('imageProduct')}>
                    <img src={images.slider_0} alt={product.title} />
                </div>
                <div className={cx('buttons')}>
                    <div className={cx('optionButtons')}>
                        <BaseButton styleButton={ButtonStyleEnum.TEXT} nextIcon={icons.heartIcon} />
                        <BaseButton styleButton={ButtonStyleEnum.TEXT} nextIcon={icons.eyeIcon} />
                    </div>
                    <BaseButton
                        className={cx('buttonAddCart')}
                        styleButton={ButtonStyleEnum.PRIMARY}
                        nameButton='Add To Cart'
                    />
                </div>
            </div>
            <Link to={`/products/details/${product._id}`}>
                <div className={cx('description')}>
                    <h1 className={cx('nameProduct')}>{product.name}</h1>
                    <h3 className={cx('tileProduct')}>{product.title}</h3>
                    <div className={cx('price')}>
                        <h4 className={cx('discountPriceProduct')}>
                            <IconSVG IconComponent={icons.dollarIcon} />
                            {`${product.discountPrice}`}
                        </h4>
                        <h4 className={cx('priceProduct')}>
                            <IconSVG IconComponent={icons.dollarIcon} />
                            {`${product.price}`}
                        </h4>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ItemProduct;
