// Libs
import React from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './SliderComponents.module.scss';
import { images } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const TypedSlider = Slider as unknown as React.FC<any>;

const SliderComponents = (props: Props) => {
    const { content } = props;

    const { t } = useTranslation();

    //#region Handle Function
    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    const discountContent = [
        {
            image: images.slider_0,
            label: 'user_label_classic_exclusive_slider',
            title: 'user_title_women_collection_slider',
            discount: 'user_discount_40_slider',
        },
        {
            image: images.slider_1,
            label: 'user_label_summer_special_slider',
            title: 'user_title_men_summer_collection_slider',
            discount: 'user_discount_50_slider',
        },
        {
            image: images.slider_2,
            label: 'user_label_festive_sale_slider',
            title: 'user_title_kids_wear_slider',
            discount: 'user_discount_30_slider',
        },
        {
            image: images.slider_3,
            label: 'user_label_winter_deals_slider',
            title: 'user_title_outerwear_jackets_slider',
            discount: 'user_discount_60_slider',
        },
    ];
    //#endregion Handle Function

    return (
        <div id='sliderComponent' className={cx('mainSliderComponent')}>
            <TypedSlider {...settings}>
                {discountContent.map((discount, index) => {
                    return (
                        <div key={index} className={cx('itemSlider')}>
                            <img src={discount.image} alt='Electronics Store One' />
                            <div className={cx('contentItemSlider')}>
                                <div className='mb-6'>
                                    <h5 className={cx('label')}>{t(`${discount.label}`)}</h5>
                                    <h1>{t(`${discount.title}`)}</h1>
                                    <h5 className={cx('discount')}>{t(`${discount.discount}`)}</h5>
                                </div>
                                <BaseButton
                                    className={cx('button')}
                                    styleButton={ButtonStyleEnum.PRIMARY}
                                    nameButton={t('user_title_button_slider')}
                                />
                            </div>
                        </div>
                    );
                })}
            </TypedSlider>
        </div>
    );
};

export default SliderComponents;
