// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './AboutPage.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const AboutPage = (props: Props) => {
    //#region Destructuring Props
    const { content = 'AboutPage' } = props;
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

    return <>{content}</>;
};

export default AboutPage;
