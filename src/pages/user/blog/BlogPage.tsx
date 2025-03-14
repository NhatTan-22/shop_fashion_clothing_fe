// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
import { Breadcrumb } from '~/components';
// Others
// Styles, Images, icons
import styles from './BlogPage.module.scss';

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
    // const { content = 'BlogPage Component' } = props;

    //#region Handle Function
    //#endregion Handle Function

    return (
        <div className={cx('mainBlogPage')}>
            <Breadcrumb breadcrumbs={blogBreadcrumbs} />
        </div>
    );
};

export default BlogPage;
