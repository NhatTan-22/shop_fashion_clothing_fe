// Libs
import React from 'react';
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
import { ButtonStyleEnum, TypeButtonENum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './ButtonBase.module.scss';

type Props = {
    title?: string;
    typeStyle?: string;
    nameButton?: string;
    label?: string;
    type?: TypeButtonENum;
    styleButton?: ButtonStyleEnum;
    width?: string;
    height?: number;
    href?: string;
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    className?: string;
};

const cx = classNames.bind(styles);

const Button = (props: Props) => {
    //#region Destructuring Props
    const {
        title,
        className,
        nameButton,
        styleButton,
        onClick,
        width = '100%',
        height = 40,
        disabled,
        type = 'button',
        children,
        prevIcon,
        nextIcon,
    } = props;
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
        <div id='baseButtonComponent' className={cx(`baseButton ${className}`)} style={{ height: `${height}px` }}>
            <button
                className={cx(`${styleButton ? styleButton : 'defaultStyle'}`)}
                type={type}
                onClick={onClick}
                disabled={disabled}
                style={{ width: width, height: `${height}px` }}
                title={title}
            >
                {prevIcon && <img className={cx('iconButton')} src={`${prevIcon}`} alt='icon' />}
                <span className={cx(`titleButton`)}>{nameButton}</span>
                {children}
                {nextIcon && <img className={cx('iconButton')} src={`${nextIcon}`} alt='icon' />}
            </button>
        </div>
    );
};

export default Button;
