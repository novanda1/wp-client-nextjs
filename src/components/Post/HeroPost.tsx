import Link from 'next/link';
import React from 'react';
import tw from 'twin.macro';
import { Avatar, Box, CoverImage, Date, Heading } from '..';
import { SinglePostType } from '../../types/SinglePostType';
import { css } from '../../../stitches.config';

const HeroPostExcerp = css({
    ...tw`text-lg leading-relaxed mb-4`,

    p: {
        ...tw`line-clamp-4`,
    },
});

const HeroPost: React.FC<SinglePostType> = ({ title, coverImage, date, excerpt, author, slug }) => {
    return (
        <section>
            <Box tws={tw`mb-8 md:mb-16`}>
                {coverImage && <CoverImage title={title} coverImage={coverImage} slug={slug} />}
            </Box>
            <Box tws={tw`md:grid md:grid-cols-2 md:gap-16 lg:gap-8 mb-20 md:mb-28`}>
                <div>
                    <Heading element="h3" tws={tw`mb-4 text-4xl lg:text-6xl leading-tight`}>
                        <Link as={`/post/${slug}`} href="/post/[slug]">
                            <a tw="hover:underline" dangerouslySetInnerHTML={{ __html: title }} />
                        </Link>
                    </Heading>
                    <Box tws={tw`mb-4 md:mb-0 text-lg`}>
                        <Date dateString={date} />
                    </Box>
                </div>
                <div>
                    <div className={HeroPostExcerp()} dangerouslySetInnerHTML={{ __html: excerpt }} />
                    <Avatar author={author} />
                </div>
            </Box>
        </section>
    );
};

export default HeroPost;
