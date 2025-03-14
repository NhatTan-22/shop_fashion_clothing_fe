// Libs
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
// Components, Layouts, Pages
import { BaseButton, Breadcrumb, IconSVG } from '~/components';
// Others
import { ButtonStyleEnum } from '~/utils/constants/enum';
// Styles, Images, icons
import styles from './ContactPage.module.scss';
import { icons } from '~/assets';

type Props = {
    content?: string;
};

const cx = classNames.bind(styles);
const contactBreadcrumbs = [
    {
        to: '/contact',
        title: 'user_title_contact_navigation',
    },
];
const { TextArea } = Input;

const ContactPage = (props: Props) => {
    const { t } = useTranslation();

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
            <Breadcrumb breadcrumbs={contactBreadcrumbs} />
            <div className={cx('swapperContact')}>
                <div className={cx('headerContact')}>
                    <h1>{t('user_title_contact')}</h1>
                    <span>{t('user_label_description_contact')}</span>
                </div>
                <div className={cx('contentContact')}>
                    <div className={cx('itemContact')}>
                        <h2 className={cx('titleContact')}>{t('user_title_address_contact')}</h2>
                        <div className={cx('descriptionContact')}>
                            <IconSVG IconComponent={icons.addressIcon} />
                            <p>{t('user_label_address_content_contact')}</p>
                        </div>
                    </div>
                    <div className={cx('itemContact')}>
                        <h2 className={cx('titleContact')}>{t('user_title_contact_contact')}</h2>
                        <div className={cx('descriptionContact')}>
                            <IconSVG IconComponent={icons.phoneIcon} />
                            <p>
                                <b>{t('user_label_phone_contact')}</b> {t('user_phone_text')}
                            </p>
                        </div>
                        <div className={cx('descriptionContact')}>
                            <IconSVG IconComponent={icons.emailIcon} />
                            <p>
                                <b>{t('user_label_email_contact')}</b> {t('user_label_email_content_contact')}
                            </p>
                        </div>
                    </div>
                    <div className={cx('itemContact')}>
                        <h2 className={cx('titleContact')}>{t('user_title_office_hours_contact')}</h2>
                        <div className={cx('descriptionContact')}>
                            <p>
                                <b>{t('user_label_monday_one_contact')}</b> {t('user_label_monday_one_content_contact')}
                            </p>
                        </div>
                        <div className={cx('descriptionContact')}>
                            <p>
                                <b>{t('user_label_monday_two_contact')}</b> {t('user_label_monday_two_content_contact')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={cx('formMessageContact')}>
                    <h1 className={cx('titleForm')}>{t('user_title_form_contact')}</h1>
                    <Form name='sendMessage'>
                        <div className='grid grid-cols-2 gap-6'>
                            <Input type='text' id='user_name' name='user_name' placeholder='Name *' size='large' />
                            <Input type='email' id='email' name='email' placeholder='Email *' size='large' />
                        </div>
                        <div className='my-5'>
                            <Input type='text' id='subject' name='subject' placeholder='Subject *' size='large' />
                        </div>
                        <div>
                            <TextArea
                                id='message'
                                name='message'
                                rows={8}
                                maxLength={255}
                                placeholder={t('Message *')}
                                size='large'
                            />
                        </div>
                        <div className='my-5'>
                            <BaseButton
                                styleButton={ButtonStyleEnum.PRIMARY}
                                nameButton={t('user_title_button_send_message')}
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
