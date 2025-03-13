// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// Components, Layouts, Pages
import IconSVG from '~/components/common/icon/IconSVG';
// Others
import { IBreadcrumb } from '~/utils/interfaces/common';
// Styles, Images, icons
import styles from './Breadcrumb.module.scss';
import { icons } from '~/assets';

type Props = {
    breadcrumbs?: IBreadcrumb[];
};

const cx = classNames.bind(styles);

const Breadcrumb = (props: Props) => {
    //#region Destructuring Props
    const { breadcrumbs = [] } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    const lastIndex = breadcrumbs.length - 1;
    //#endregion Selector

    //#region Declare State
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div id='breadcrumbComponent' className={cx('mainBreadcrumb')}>
            <nav className={cx('contentBreadcrumb')} aria-label='Breadcrumb'>
                <ol className={cx('listBreadcrumb')}>
                    <li className={cx('liBreadcrumb')}>
                        <Link to='/' className={cx('linkBreadcrumb')}>
                            <IconSVG IconComponent={icons.homeIcon} />
                            {t('user_title_home_navigation')}
                        </Link>
                    </li>
                    {breadcrumbs &&
                        breadcrumbs.map((breadcrumb, i) => {
                            return (
                                <li key={i} {...(lastIndex === i ? { 'aria-current': 'page' } : {})}>
                                    <div className={cx('divBreadcrumb')}>
                                        <IconSVG IconComponent={icons.slashIcon} />
                                        <Link to={lastIndex === i ? '#' : breadcrumb.to}>
                                            <span
                                                className={cx(
                                                    `spanOne ${lastIndex === i ? 'defaultColor' : ''}`
                                                )}
                                            >
                                                {t(`${breadcrumb.title}`)}
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
