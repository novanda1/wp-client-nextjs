import React from 'react';
import tw from 'twin.macro';

import { Avatar, Date, CoverImage, PostTitle, Categories, Box } from '..';
import { SinglePostType } from '../../types/SinglePostType';

const PostHeader: React.FC<SinglePostType> = ({ title, coverImage, date, author, categories }) => {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <Box tws={tw`hidden md:block md:mb-12`}>
                <Avatar author={author} />
            </Box>
            <Box tws={tw`mb-8 md:mb-16 sm:mx-0`}>
                <CoverImage title={title} coverImage={coverImage} />
            </Box>
            <Box tws={tw`max-w-2xl mx-auto`}>
                <Box tws={tw`block md:hidden mb-6`}>
                    <Avatar author={author} />
                </Box>
                <Box tws={tw`mb-6 text-lg`}>
                    Posted <Date dateString={date} />
                    <Categories categories={categories} />
                </Box>
            </Box>
        </>
    );
};

export default PostHeader;
