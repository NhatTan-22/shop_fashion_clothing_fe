// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './BlogPage.module.scss';
import { Breadcrumb } from '~/components';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);
const blogBreadcrumbs = [
    {
        to: '/blog',
        title: 'user_title_blog_navigation',
    },
];

const BlogPage = (props: Props) => {
    //#region Destructuring Props
    const { content = 'BlogPage Component' } = props;
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
        <div>
            <Breadcrumb breadcrumbs={blogBreadcrumbs} />
        </div>
    );
};

export default BlogPage;
