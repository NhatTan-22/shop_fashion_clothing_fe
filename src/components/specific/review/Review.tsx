// Libs
import classNames from 'classnames/bind';
import { Avatar, Badge, Button, Dropdown, Input, Rate, Typography } from 'antd';
// Components, Layouts, Pages
import IconSVG from '~/components/common/icon/IconSVG';
// Others
// Styles, Images, icons
import styles from './Review.module.scss';
import { icons } from '~/assets';
import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

type Props = {
    // content?: string;
};

const cx = classNames.bind(styles);

const Review = (props: Props) => {
    // const { content = 'Review Component' } = props;

    const emojiRef = useRef<HTMLDivElement>(null);

    const [isReply, setIsReply] = useState<boolean>(false);
    const [isEmoji, setIsEmoji] = useState<boolean>(false);
    const [isLike, setIsLike] = useState<boolean>();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
                setIsEmoji(false);
            }
        };

        if (isEmoji) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEmoji]);

    //#region Handle Function
    function handleReply() {
        console.log(isReply);
        setIsReply(!isReply);
    }

    function handleEmoji() {
        setIsEmoji(!isEmoji);
    }

    function handleGetEmoji(emojiData: EmojiClickData, event: MouseEvent) {}
    //#endregion Handle Function

    return (
        <div id='reviewComponent' className={cx('mainReview')}>
            <div className={cx('addReview')}>
                <Typography.Title level={2}>Add Review</Typography.Title>
                <Rate style={{ fontSize: '1.5rem', gap: '0.1rem' }} value={0} allowHalf />
                <div>
                    <div className='flex items-center gap-2 mt-4'>
                        <Input size='large' type='text' placeholder='Write your reply' onChange={() => {}} />
                        <IconSVG
                            className='relative cursor-pointer'
                            width={32}
                            height={32}
                            IconComponent={icons.smileIcon}
                            onClick={handleEmoji}
                        />
                        <Button size='large' type='primary'>
                            <IconSVG IconComponent={icons.sendIcon} />
                        </Button>
                        <Button size='large' type='default'>{`${t('common_cancel')}`}</Button>
                    </div>
                    <div ref={emojiRef} className='w-0'>
                        {isEmoji && (
                            <EmojiPicker
                                className='absolute top-5 left-0 z-1'
                                width={350}
                                height={350}
                                onEmojiClick={handleGetEmoji}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('customReview')}>
                <Typography.Title level={2}>Custom Review</Typography.Title>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-2 mr-20'>
                        <Avatar shape='circle' size={'large'} src='https://placeimg.com/640/480/any' alt='review' />
                        <div>
                            <Typography.Title level={4} style={{ marginBottom: -5 }}>
                                Review
                            </Typography.Title>
                            <Rate style={{ fontSize: '0.8rem', gap: '0.1rem' }} value={3} disabled />
                        </div>
                    </div>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: `common_edit_1`,
                                    label: <p style={{ marginLeft: '2px' }}>{`${t('common_edit')}`}</p>,
                                    icon: <IconSVG IconComponent={icons.editIcon} />,
                                    // onClick: () => handleEditSupplier(record),
                                },
                                {
                                    key: `common_delete_2`,
                                    label: <p style={{ marginLeft: '2px' }}>{`${t('common_delete')}`}</p>,
                                    icon: <IconSVG IconComponent={icons.deleteIcon} />,
                                    // onClick: () => handleDeleteSupplier(record),
                                },
                            ],
                        }}
                        trigger={['click']}
                    >
                        <div>
                            <IconSVG IconComponent={icons.dotVerticalIcon} className='cursor-pointer' />
                        </div>
                    </Dropdown>
                </div>
                <div>
                    <Typography.Paragraph type='secondary' style={{ marginBottom: '2px' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography.Paragraph>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2 mr-20'>
                            <span>1 date</span>
                            <Button type='text' onClick={handleReply}>
                                Reply
                            </Button>
                            <Badge
                                count={
                                    <span className='flex items-center justify-center p-1 bg-slate-200 rounded-full shadow'>
                                        <IconSVG
                                            IconComponent={icons.heartIcon}
                                            className='cursor-pointer'
                                            colorIcon='red'
                                            width={15}
                                            height={15}
                                        />
                                    </span>
                                }
                                offset={[2, 20]}
                                color='transparent'
                            >
                                <Avatar
                                    shape='circle'
                                    size={'small'}
                                    src='https://placeimg.com/640/480/any'
                                    alt='review'
                                />
                            </Badge>
                        </div>
                        <div className='flex items-center gap-2 mr-20'>
                            <IconSVG
                                IconComponent={icons.likeIcon}
                                className='cursor-pointer'
                                colorIcon={`${isLike ? '#8a4db7' : 'black'}`}
                                onClick={() => setIsLike(true)}
                            />
                            <IconSVG
                                IconComponent={icons.dislikeIcon}
                                className='cursor-pointer'
                                colorIcon={`${isLike ? 'black' : '#8a4db7'}`}
                                onClick={() => setIsLike(false)}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 ml-12'>
                    <div className='flex items-center gap-2 mr-20'>
                        <Avatar shape='circle' size={'large'} src='https://placeimg.com/640/480/any' alt='review' />
                        <Typography.Title level={4} style={{ marginBottom: -5 }}>
                            {/* Tên user Review  */} Review
                        </Typography.Title>
                    </div>
                    <div>
                        <Typography.Paragraph type='secondary' style={{ marginBottom: '2px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography.Paragraph>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2 mr-20'>
                                <span>{/* Date */} Date</span>
                                <Button type='text' onClick={handleReply}>
                                    {/* Reply */} {`${t('common_reply')}`}
                                </Button>
                                <Badge
                                    count={
                                        <span className='flex items-center justify-center p-1 bg-slate-200 rounded-full shadow'>
                                            <IconSVG
                                                IconComponent={icons.heartIcon}
                                                className='cursor-pointer'
                                                colorIcon='red'
                                                width={15}
                                                height={15}
                                            />
                                        </span>
                                    }
                                    offset={[2, 20]}
                                    color='transparent'
                                >
                                    <Avatar
                                        shape='circle'
                                        size={'small'}
                                        src='https://placeimg.com/640/480/any'
                                        alt='review'
                                    />
                                </Badge>
                            </div>
                            <div className='flex items-center gap-2 mr-20'>
                                <IconSVG
                                    IconComponent={icons.likeIcon}
                                    className='cursor-pointer'
                                    colorIcon={`${isLike ? '#8a4db7' : 'black'}`}
                                    onClick={() => setIsLike(true)}
                                />
                                <IconSVG
                                    IconComponent={icons.dislikeIcon}
                                    className='cursor-pointer'
                                    colorIcon={`${isLike ? 'black' : '#8a4db7'}`}
                                    onClick={() => setIsLike(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {isReply && (
                    <div className='flex items-center gap-2 mt-4'>
                        <Input size='large' type='text' placeholder='Write your reply' onChange={() => {}} />
                        <IconSVG
                            className='relative cursor-pointer'
                            width={32}
                            height={32}
                            IconComponent={icons.smileIcon}
                            onClick={handleEmoji}
                        />
                        <Button size='large' type='primary'>
                            <IconSVG IconComponent={icons.sendIcon} />
                        </Button>
                        <Button size='large' type='default'>{`${t('common_cancel')}`}</Button>
                    </div>
                )}
                <div ref={emojiRef} className='w-0'>
                    {isEmoji && (
                        <EmojiPicker
                            className='absolute top-5 left-0 z-1'
                            width={350}
                            height={350}
                            onEmojiClick={handleGetEmoji}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Review;
