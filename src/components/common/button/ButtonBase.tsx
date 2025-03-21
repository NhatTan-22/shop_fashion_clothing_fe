// Libs
import React from 'react';
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
import { ButtonStyleEnum, TypeButtonENum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './ButtonBase.module.scss';
import IconSVG from '../icon/IconSVG';

type Props = {
    title?: string;
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
    prevIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    nextIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    className?: string;
};

const cx = classNames.bind(styles);

const Button = (props: Props) => {
   
    const {
        title,
        className,
        nameButton,
        styleButton,
        onClick,
        width = '100%',
        height = 40,
        disabled = false,
        type = 'button',
        children,
        prevIcon,
        nextIcon,
    } = props;
    

    
    

    
    

    
    

    
   

    //#region Handle Function

    //#endregion Handle Function

    return (
        <div id='baseButtonComponent' className={cx(`baseButton ${className}`)} style={{ height: `${height}px` }}>
            <button
                className={cx(`${styleButton ? styleButton : 'defaultStyle'}`, { disabledStyle: disabled })}
                type={type}
                onClick={onClick}
                disabled={disabled ? true : false}
                style={{ width: width, height: `${height}px` }}
                title={title}
            >
                {prevIcon && <IconSVG IconComponent={prevIcon} />}
                <span className={cx(`titleButton`)}>{nameButton}</span>
                {children}
                {nextIcon && <IconSVG IconComponent={nextIcon} />}
            </button>
        </div>
    );
};

export default Button;
