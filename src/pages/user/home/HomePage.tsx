// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// Components, Layouts, Pages
import { BaseButton, Slider } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
import { baseURL } from '~/utils/constants/env';
// Styles, Images, icons
import styles from './HomePage.module.scss';
import { icons } from '~/assets';

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
                    <div>
                        <h1 className='leading-9 text-3xl font-semibold'>Popular products</h1>
                    </div>
                    <div className={cx('headerPopularProductsRight')}>
                        <Link to='/products'>
                            <BaseButton
                                styleButton={ButtonStyleEnum.TEXT}
                                nextIcon={`${icons.arrowRightIcon}`}
                                nameButton='View products'
                            />
                        </Link>
                    </div>
                </div>
                <div className='mb-24'>
                    {data?.map((product, index) => {
                        return (
                            <div className='flex justify-center text-center' key={index}>
                                <div className='h-auto w-56 rounded-md bg-gray-100 shadow-xl mx-4'>
                                    <div className='text-base mb-8 pb-5'>
                                        <Link to={`/products/details/{id}`}>
                                            <BaseButton>
                                                <img className='w-40 h-40 my-8' src={`${baseURL}/${''}`} alt={''} />
                                            </BaseButton>
                                            <div className='hover:text-red-600 my-4'>
                                                <BaseButton>
                                                    <h1 className='h-12 mx-4 line-clamp-2'>{''}</h1>
                                                </BaseButton>
                                            </div>
                                        </Link>
                                        <div className='text-center'>{/* <Star stars={product.rating.rate} /> */}</div>
                                        {/* <Price price={Math.ceil(product.price)} /> */}
                                    </div>
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
