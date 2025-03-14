// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './DialogDefault.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const DialogDefault = (props: Props) => {
   
    const { content = 'Example Component' } = props;
    

    
    

    
    

    
    

    
   

    //#region Handle Function
    //#endregion Handle Function

    return <div className={cx('dialogDefault')}>{content}</div>;
};

export default DialogDefault;
