// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
// Others
// Styles, Images, icons
import styles from './Report.module.scss';
import { Flex, Input, Tag } from 'antd';
import { useState } from 'react';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const Report = (props: Props) => {
   
    const { content = 'Report Component' } = props;
    

    
    

    
    

    
    const [sizeInput, setSizeInput] = useState<string>('');
    const [addProduct, setAddProduct] = useState([] as string[]);
    

    
   

    //#region Handle Function
    function handleGetInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSizeInput(e.target.value);
    }

    function handleInputConfirm(type: 'sizes') {
        if (type === 'sizes' && sizeInput.trim() && !addProduct.includes(sizeInput.trim())) {
            setAddProduct((prev) => [...prev, sizeInput.trim()]);
            setSizeInput('');
        }
    }
    //#endregion Handle Function

    return (
        <div id='dashBoardPage' className='p-6 bg-blue-chalk-100 h-full overflow-auto'>
            <Input
                style={{ width: '100%' }}
                name='sizes'
                size='large'
                type='text'
                value={sizeInput}
                onChange={handleGetInput}
                onPressEnter={() => handleInputConfirm('sizes')}
            />
            <Flex gap='4px 0' wrap>
                {addProduct.map((size, index) => (
                    <Tag
                        key={`${index}-${size}`}
                        bordered={false}
                        closable
                        onClose={(e) => {
                            e.preventDefault();
                            const remove = addProduct.filter((sizeFilter) => sizeFilter !== size);
                            setAddProduct((prev) => ({ ...prev, sizes: remove }));
                        }}
                    >
                        {`${size}`}
                    </Tag>
                ))}
            </Flex>
        </div>
    );
};

export default Report;
