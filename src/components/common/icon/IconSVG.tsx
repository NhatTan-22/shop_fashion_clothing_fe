// Libs
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import { useEffect, useRef } from 'react';

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
    //#region Destructuring Props
    const {
        IconComponent,
        width = 24,
        height = 24,
        colorIcon = 'currentColor',
        border,
        className,
        bgColor,
        onClick,
    } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const pathElements = svgRef.current.querySelectorAll('path, circle, rect, line, polyline, polygon');
            pathElements.forEach((element) => {
                element.setAttribute('stroke', colorIcon);
            });
        }
    }, [colorIcon]);
    //#endregion Implement Hook

    //#region Handle Function
    if (!IconComponent) return <></>;

    //#endregion Handle Function

    return (
        <span className='inline-flex items-center justify-center'>
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
