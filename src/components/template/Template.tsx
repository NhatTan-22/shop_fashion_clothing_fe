// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './Example.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Example = (props: Props) => {
   
    const { content = 'Example Component' } = props;
    

    
    

    
    

    
    

    
   

    //#region Handle Function
    //#endregion Handle Function

    return <>{content}</>;
};

export default Example;
