import Link from 'next/link';
import React from 'react';
import tw from 'twin.macro';
import { Avatar, Box, CoverImage, Date, Heading } from '..';
import { SinglePostType } from '../../types/SinglePostType';
import { css } from '../../../stitches.config';

const PostPreviewContent = css({
    ...tw`text-lg leading-relaxed mb-4`,

    p: {
        ...tw`line-clamp-4`,
    },
});

const LinkSt = css(tw`hover:underline`);

const PostPreview: React.FC<SinglePostType> = ({ title, coverImage, date, excerpt, author, slug }) => {
    return (
        <div>
            <Box tws={tw`mb-5`}>
                <CoverImage title={title} coverImage={coverImage} slug={slug} />
            </Box>
            <Heading element="h3" tws={tw`text-3xl mb-3 leading-snug`}>
                <Link as={`/posts/${slug}`} href="/posts/[slug]">
                    <a className={LinkSt()} dangerouslySetInnerHTML={{ __html: title }} />
                </Link>
            </Heading>
            <Box tws={tw`text-lg mb-4`}>
                <Date dateString={date} />
            </Box>
            <div className={PostPreviewContent()} dangerouslySetInnerHTML={{ __html: excerpt }} />
            <Avatar author={author} />
        </div>
    );
};

export default PostPreview;
