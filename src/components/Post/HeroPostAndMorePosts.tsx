import InfinitePageContext from 'context/InfinitePageContext';
import React, { ReactElement, useContext, useEffect } from 'react';
import { HeroPost } from '..';
import MoreStories from './MoreStories';

interface Props {
    index: number;
    heroPost: any;
    morePosts: any[];
}

export default function HeroPostAndMorePosts({ index, heroPost, morePosts }: Props): ReactElement {
    const { cursor, onLastCursor: onLastCursor, lastCursor } = useContext(InfinitePageContext);
    const lastMorePost = morePosts[morePosts.length - 1].cursor;

    useEffect(() => {
        if (cursor !== lastCursor) onLastCursor(lastMorePost);
    }, [morePosts]);

    return (
        <>
            {index <= 0 && (
                <HeroPost
                    title={heroPost.title}
                    coverImage={heroPost.featuredImage?.node}
                    date={heroPost.date}
                    author={heroPost.author?.node}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                />
            )}
            {morePosts.length > 0 && <MoreStories useHeading={index < 0} posts={morePosts} />}
        </>
    );
}
