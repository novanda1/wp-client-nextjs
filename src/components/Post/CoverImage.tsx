import React from 'react';
import Link from 'next/link';
import tw from 'twin.macro';
import { styled } from '../../../stitches.config';
import Box from '../Utils/Box';

const Image = styled('img', {
    ...tw`shadow-small`,
    variants: {
        hasHover: {
            true: tw`shadow-small hover:shadow-medium transition-shadow duration-200`,
        },
    },
});

const CoverImage: React.FC<{
    title: string;
    coverImage: any;
    slug?: string;
}> = ({ title, coverImage, slug }) => {
    return (
        <Box tws={tw`sm:mx-0`}>
            {slug ? (
                <Link as={`/post/${slug}`} href="/post/[slug]">
                    <a>
                        <Image src={coverImage?.sourceUrl} hasHover alt={title} />
                    </a>
                </Link>
            ) : (
                <Image src={coverImage?.sourceUrl} alt={title} />
            )}
        </Box>
    );
};

export default CoverImage;
