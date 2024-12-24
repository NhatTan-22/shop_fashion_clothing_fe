// Libs
import classNames from 'classnames/bind';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
// Components, Layouts, Pages
// Others
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';
// Styles, Images, icons
import styles from './FormSupplier.module.scss';

type Props = {
    data?: ISupplier;
};

const cx = classNames.bind(styles);

const Example = (props: Props) => {
    //#region Destructuring Props
    const { data } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    const { t } = useTranslation();
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [supplier, setSupplier] = useState<ISupplier>();
    //#endregion Declare State

    //#region Implement Hook
    console.log(data);
    //#endregion Implement Hook

    //#region Handle Function
    const handleGetInput = (e: React.ChangeEvent<HTMLInputElement>) => {};
    //#endregion Handle Function

    return (
        <Form
            id={`${data?.id}`}
            name={`${data?.supplierName}`}
            className={cx('formSupplier')}
            initialValues={{
                supplierEmail: data?.supplierEmail,
            }}
        >
            <Form.Item name={'supplierEmail'} htmlFor='email-supplier' label={t('supplier_email_label')}>
                <Input
                    className={cx('inputFormSupplier')}
                    id='email-supplier'
                    name='supplierEmail'
                    type='email'
                    autoFocus
                    value={`${data?.supplierEmail}`}
                    placeholder={t('supplier_email_placeholder')}
                    title={t('supplier_email_label')}
                    onChange={handleGetInput}
                />
            </Form.Item>
            <Form.Item name={'supplierPhone'} htmlFor='phone-supplier' label={t('supplier_phone_label')}>
                <Input
                    className={cx('inputFormSupplier')}
                    id='phone-supplier'
                    name='supplierPhone'
                    type='text'
                    value={supplier?.supplierPhone}
                    placeholder={t('supplier_phone_placeholder')}
                    title={t('supplier_phone_label')}
                    // onChange={handleGetInput}
                />
            </Form.Item>
        </Form>
    );
};

export default Example;
