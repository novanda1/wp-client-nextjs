import React, { useContext, useEffect } from 'react';
import PaginateContext from '../../context/PaginateContext';
import { PostsDocument, PostsQuery } from '../../generated/graphql';
import { fetchSWR } from '../../utils/fetcher';
import { HeroPostAndMorePosts } from '..';

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
            <HeroPostAndMorePosts index={index} heroPost={heroPost} morePosts={morePosts} />
        </>
    );
};

export default Page;
