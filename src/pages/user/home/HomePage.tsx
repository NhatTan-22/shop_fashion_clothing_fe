// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// Components, Layouts, Pages
import { BaseButton, IconSVG, Slider } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { baseURL } from '~/utils/constants/env';
// Styles, Images, icons
import styles from './HomePage.module.scss';
import { icons, images } from '~/assets';
import { subBanners } from '~/utils/constants/mockData';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const HomePage = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [data, setData] = useState([]);
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div id='homePage' className={cx('mainHomePage')}>
            <Slider />
            <div className={cx('swapper')}>
                <div className={cx('headerPopularProducts')}>
                    <h1>{t('user_popular_products_tile')}</h1>
                    <div className={cx('headerPopularProductsRight')}>
                        <Link to='/products'>
                            <BaseButton
                                styleButton={ButtonStyleEnum.TEXT}
                                nextIcon={icons.arrowRightIcon}
                                nameButton={t('user_view_products_label')}
                            />
                        </Link>
                    </div>
                </div>
                <div className={cx('contentPopularProduct')}>
                    {subBanners?.map((product, index) => {
                        return (
                            <div className={cx('itemPopularProduct')} key={index}>
                                <div className={cx('boxImage')}>
                                    <div className={cx('imagePopular')}>
                                        <img
                                            // src={`${baseURL}/${product.image}`}
                                            src={images.slider_0}
                                            alt={product.title}
                                        />
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
                                <Link to={`/products/details/${index}`}>
                                    <div className={cx('description')}>
                                        <h1 className={cx('namePopular')}>{product.name}</h1>
                                        <h3 className={cx('tilePopular')}>{product.title}</h3>
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
                    })}
                </div>
                <div className={cx('subBanner')}>
                    {data?.map((subBanner, i) => {
                        return (
                            <div key={i}>
                                <img className='' src={`${baseURL}`} alt={''} />
                                <div className='w-full absolute top-24 text-center'>
                                    <h1 className='my-4 text-3xl font-semibold'>{''}</h1>
                                    <BaseButton nameButton={t('user_title_button_sub_banner')} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
