// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, images, icons
import styles from './Loading.module.scss';

type Props = {
    loading?: boolean;
};

const cx = classNames.bind(styles);

const Loading = (props: Props) => {
    const { loading = true } = props;

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div id='loadingComponent'>
            {loading && (
                <div className={cx('loadingContainer')}>
                    <span className={cx('loadingContent')}></span>
                </div>
            )}
        </div>
    );
};

export default Loading;
