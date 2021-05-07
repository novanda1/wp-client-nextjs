import React, { useContext, useEffect } from 'react';
import PaginateContext from '../../context/PaginateContext';
import { PostsDocument, PostsQuery } from '../../generated/graphql';
import { fetchSWR } from '../../utils/fetcher';
import HeroPost from './HeroPost';
import MoreStories from './MoreStories';

const Page: React.FC<{ index: number }> = ({ index }) => {
    const { limit, initialLimit, cursor, onChangeCursor, initialData } = useContext(PaginateContext);
    const { data, isError, isLoading } = fetchSWR(index, {
        query: PostsDocument,
        variables: {
            limit: index === 0 ? initialLimit : limit,
            cursor,
        },
        initialData,
    });

    console.log(`limit`, limit);

    const result: PostsQuery = data;

    useEffect(() => {
        if (!isError && !isLoading) onChangeCursor(result?.posts?.edges[data.posts.edges.length - 1].cursor);
    }, [result]);

    if (isError) {
        return <div>Error...</div>;
    }

    if (isLoading) {
        return <div>loading...</div>;
    }

    const heroPost = result.posts?.edges[0]?.node;
    const morePosts = result.posts?.edges?.slice(index === 0 ? 1 : 0);

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
};

export default Page;
