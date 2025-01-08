// Libs
import classNames from 'classnames/bind';
// Components, Layouts, Pages
import { BaseButton } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './ContactPage.module.scss';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);

const ContactPage = (props: Props) => {
    //#region Destructuring Props
    const { content = 'AboutPage' } = props;
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
    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs
    //       .sendForm(
    //         "service_flchutm",
    //         "template_bd8kdo5",
    //         formRef.current,
    //         "lNygUf-F-TvbhSJBj"
    //       )
    //       .then(
    //         (result) => {
    //           console.log(result.text);
    //         },
    //         (error) => {
    //           console.log(error.text);
    //         }
    //       );

    //     e.target.reset();
    //   };
    //#endregion Handle Function

    return (
        <div id='aboutPage' className={cx('mainAboutPage')}>
            <div className='text-base'>
                <h1 className='text-4xl font-normal mb-2'>Chúng tôi luôn mong muốn được nghe từ bạn!</h1>
                <p>
                    Bạn có thể gọi cho chúng tôi trong thời gian làm việc hoặc ghé thăm văn phòng của chúng tôi.
                    <br /> Tất cả các thư sẽ nhận được phản hồi trong vòng 24 giờ. Thích nghe từ bạn!
                </p>
            </div>
            <div className="grid grid-cols-3 gap-3 font-['Open_Serif'] my-12 text-base">
                <div className='flex'>
                    {/* <CiLocationOn className='text-red-600 mr-2 mt-1 text-4xl' /> */}
                    <div>
                        <h2 className='text-2xl mb-4 mt-1'>ĐỊA CHỈ</h2>
                        <p>Quảng Yên - Quảng Ninh - Việt Nam</p>
                    </div>
                </div>
                <div className='flex'>
                    {/* <AiOutlinePhone className='text-red-600 mr-2 mt-1 text-4xl' /> */}
                    <div>
                        <h2 className='text-2xl mb-4 mt-1'>LIÊN HỆ</h2>
                        <p>
                            Iphone: <b>(+84) 868342028</b>
                        </p>
                        <p>
                            Mail: <b>tan2002@gmail.com</b>
                        </p>
                    </div>
                </div>
                <div className='flex'>
                    {/* <MdAccessTime className='text-red-600 mr-2 mt-1 text-4xl' /> */}
                    <div>
                        <h2 className='text-2xl mb-4 mt-1'>GIỜ HÀNH CHÍNH</h2>
                        <p>
                            Thứ 2 – 6 : <b>09:00 – 20:00</b>
                        </p>
                        <p>
                            Thứ 7 & Chủ nhật: <b>10:30 – 22:00</b>
                        </p>
                    </div>
                </div>
            </div>

            <div className='text-center text-base mb-24'>
                <h1 className='text-4xl font-normal my-10'>Hỏi chúng tôi bất cứ điều gì ở đây!</h1>
                <form>
                    <div className="grid grid-cols-2 gap-6 font-['Open_Serif']">
                        <input
                            type='text'
                            id='user_name'
                            name='user_name'
                            placeholder='Name *'
                            className='h-6 w-full py-4 pl-3 outline-none 
                    border-solid border-2 bg-gray-100
                    rounded-2xl focus:border-red-500'
                        />
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email *'
                            className='h-6 w-full py-4 pl-3 outline-none 
                    border-solid border-2 bg-gray-100
                    rounded-2xl focus:border-red-500'
                        />
                    </div>
                    <div className='my-5'>
                        <input
                            type='text'
                            id='Subject'
                            name='Subject'
                            placeholder='Subject *'
                            className='h-6 w-full py-4 pl-3 outline-none 
                    border-solid border-2 bg-gray-100
                    rounded-2xl focus:border-red-500'
                        />
                    </div>
                    <div>
                        <textarea
                            // type='message'
                            id='message'
                            name='message'
                            placeholder='Message *'
                            // cols='155'
                            // rows='10'
                            className='px-3.5 py-2.5 outline-none 
                    border-solid border-2 bg-gray-100
                    rounded-2xl focus:border-red-500'
                        />
                    </div>
                    <div className='my-5'>
                        <BaseButton styleButton={ButtonStyleEnum.PRIMARY} nameButton='Send Message' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
