import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../../assets/index';

const NotFoundPage = () => {
    return (
        <div>
            <div className='relative'>
                {/* <img className='h-screen w-screen object-contain' alt='NotFound_404' src='' /> */}
            </div>
            <div className='absolute top-56 text-center text-base w-full text-orange-500'>
                {/* <img className="w-1/2 h-1/2 rounded-full" alt="" src="/images/LogoTS.png" /> */}
                <h1 className='text-5xl font-bold'>Không tìm thấy nội dung</h1>
                <ul className='mt-4 flex flex-col gap-2 text-base'>
                    <li>
                        URL của nội dung này đã <strong>bị thay đổi</strong> hoặc <strong>không còn tồn tại</strong>.
                    </li>
                    <li>
                        Nếu bạn <strong>đang lưu URL này</strong>, hãy thử <strong>truy cập lại từ trang chủ</strong>{' '}
                        thay vì dùng URL đã lưu.
                    </li>
                </ul>
                <Link to='/'>
                    <button className='ml-3  text-lg rounded-full bg-red-600 text-white px-6 py-2'>
                        Truy cập trang chủ
                    </button>
                </Link>
                <p className='mt-2 text-lg'>
                    👉 hoặc đi tới{' '}
                    <Link to='/products'>
                        <button className='rounded-full bg-red-600 text-white px-6 py-2'>Sản phẩm</button>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
