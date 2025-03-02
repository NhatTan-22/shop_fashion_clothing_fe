// Libs
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import { useEffect, useRef } from 'react';

type Props = {
    IconComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
    width?: number | string;
    height?: number | string;
    colorIcon?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const IconSVG = (props: Props) => {
    //#region Destructuring Props
    const { IconComponent, width = 24, height = 24, colorIcon = 'currentColor', onClick } = props;
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
            const pathElements = svgRef.current.querySelectorAll('path');
            pathElements.forEach((path) => {
                path.setAttribute('stroke', colorIcon);
            });
        }
    }, [colorIcon]);
    //#endregion Implement Hook

    //#region Handle Function
    if (!IconComponent) {
        return null;
    }

    //#endregion Handle Function

    return (
        <div>
            <IconComponent width={width} height={height} ref={svgRef} onClick={onClick} />
        </div>
    );
};

export default IconSVG;
