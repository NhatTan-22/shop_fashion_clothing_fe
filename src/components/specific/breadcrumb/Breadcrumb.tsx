// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './Breadcrumb.module.scss';
import { Link } from 'react-router-dom';
import { IBreadcrumb } from '~/utils/interfaces/common';
import IconSVG from '~/components/common/icon/IconSVG';
import { icons } from '~/assets';
import { useTranslation } from 'react-i18next';

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
                <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
                    <li className='inline-flex items-center'>
                        <Link to='/' className='inline-flex items-center text-sm font-medium text-gray-700 gap-2'>
                            <IconSVG IconComponent={icons.homeIcon} /> 
                            {t('user_title_home_navigation')}
                        </Link>
                    </li>
                    {breadcrumbs &&
                        breadcrumbs.map((breadcrumb, i) => {
                            return (
                                <li key={i} {...(lastIndex === i ? { 'aria-current': 'page' } : {})}>
                                    <div className='flex items-center'>
                                        <IconSVG IconComponent={icons.slashIcon} />
                                        <Link to={lastIndex === i ? '#' : breadcrumb.to}>
                                            <span
                                                className={`ms-1 text-sm font-medium md:ms-2 ${
                                                    lastIndex === i ? 'text-red-600 cursor-default' : ''
                                                }`}
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
