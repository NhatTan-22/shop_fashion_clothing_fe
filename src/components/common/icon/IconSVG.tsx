// Libs
import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './IconSVG.module.scss';

const cx = classNames.bind(styles);

type Props = {
    IconComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
    className?: string;
    width?: number | string;
    height?: number | string;
    colorIcon?: string;
    border?: string;
    bgColor?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const IconSVG = (props: Props) => {
    const { IconComponent, width = 24, height = 24, colorIcon = 'currentColor', border, className, onClick } = props;

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const pathElements = svgRef.current.querySelectorAll('path, circle, rect, line, polyline, polygon');
            pathElements.forEach((element) => {
                element.setAttribute('stroke', colorIcon);
            });
        }
    }, [colorIcon]);

    //#region Handle Function
    if (!IconComponent) return <></>;

    //#endregion Handle Function

    return (
        <span className={cx('iconSVG')}>
            <IconComponent
                width={width}
                height={height}
                ref={svgRef}
                onClick={onClick}
                className={`${border || ''} ${className || ''}`}
                style={{ stroke: colorIcon, fill: 'none' }}
            />
        </span>
    );
};

export default IconSVG;
