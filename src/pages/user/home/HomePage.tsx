// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { message } from 'antd';
// Components, Layouts, Pages
import { BaseButton, ItemProduct, Slider } from '~/components';
// Others
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { getProductThunk } from '~/thunks/product/productThunk';
import { LoadingContext } from '~/context';
import { productActions } from '~/thunks/product/productSlice';
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { getUniqueCategoryProducts } from '~/utils/constants/helper';
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './HomePage.module.scss';
import { icons } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const HomePage = (props: Props) => {
    //#region Destructuring Props
    // const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);
    //#endregion Declare Hook

    //#region Selector
    const isRefreshTable = useAppSelector((state) => state.product.isRefreshSupplier);
    //#endregion Selector

    //#region Declare State
    const [data, setData] = useState<IProduct[]>([]);
    //#endregion Declare State

    //#region Implement Hook
    useEffect(() => {
        loadingContext?.show();
        dispatch(getProductThunk({}))
            .unwrap()
            .then((response) => {
                if (response) {
                    const popular = getUniqueCategoryProducts(response?.data as IProduct[]);
                    setData(popular);
                }
            })
            .catch((error) => {
                message.error(error?.message);
            })
            .finally(() => {
                loadingContext?.hide();
                dispatch(productActions.setRefreshTableFalse());
            });
    }, [isRefreshTable]);
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
                    {data?.map((product, index) => {
                        return <ItemProduct key={index} product={product} titleAdd='Add to cart' />;
                    })}
                </div>
                <div className={cx('subBanner')}>
                    {/* {data?.map((subBanner, i) => {
                        return (
                            <div key={i}>
                                <img className='' src={`${baseURL}`} alt={''} />
                                <div className='w-full top-24 text-center'>
                                    <h1 className='my-4 text-3xl font-semibold'>{''}</h1>
                                    <BaseButton nameButton={t('user_title_button_sub_banner')} />
                                </div>
                            </div>
                        );
                    })} */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
