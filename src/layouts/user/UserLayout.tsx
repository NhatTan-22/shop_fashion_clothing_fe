// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './UserLayout.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const UserLayout = (props: Props) => {
    //#region Destructuring Props
    const { content = 'Example Component' } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
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
        <div id='userLayout' className={cx('mainUserLayout')}>
            <div>HEADER</div>
            <div>{content}</div>
        </div>
    );
};

export default UserLayout;
