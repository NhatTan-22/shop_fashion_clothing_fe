// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './Report.module.scss';
import { Flex, Tag } from 'antd';
import { IconSVG } from '~/components';
import { icons } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Report = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Report Component' } = props;
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
        <>
            <Flex gap='4px 0' wrap>
                {/* {addProduct?.colors ??
                    addProduct.colors.map((color) => {
                        return ( */}
                <Tag
                    color={'red'}
                    bordered={false}
                    closable
                    // onClose={(e) => {
                    //     e.preventDefault();
                    //     const remove = addProduct.colors.filter((colorFilter) => colorFilter !== color);
                    //     setAddProduct((prev) => ({ ...prev, colors: remove }));
                    // }}
                >
                    {'red'}
                </Tag>
                <Tag
                    color={'blue'}
                    bordered={false}
                    closable
                    // onClose={(e) => {
                    //     e.preventDefault();
                    //     const remove = addProduct.colors.filter((colorFilter) => colorFilter !== color);
                    //     setAddProduct((prev) => ({ ...prev, colors: remove }));
                    // }}
                >
                    {'blue'}
                </Tag>
                {/* );
                    })} */}
            </Flex>
        </>
    );
};

export default Report;
