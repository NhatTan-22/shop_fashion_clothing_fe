// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './Report.module.scss';

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

    return <div id='dashBoardPage' className='p-6 bg-blue-chalk-100 h-full overflow-auto'></div>;
};

export default Report;
