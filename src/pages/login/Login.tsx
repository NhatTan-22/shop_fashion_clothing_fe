// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
// Components, Layouts, Pages
import { BaseButton } from '../../components';
// Others
// Styles, Images, icons
import styles from './Login.module.scss';
import { images } from '../../assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Login = (props: Props) => {
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
        <div className={cx('mainLogin')}>
            <div>
                <img className={cx('logoStoreLogin')} src={images.fashionStore} alt='' />
            </div>
            <div className={cx('formLogin')}>
            </div>
        </div>
    );
};

export default Login;
