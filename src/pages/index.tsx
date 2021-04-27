import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { Box, Button, Container, HeroPost, Intro, Layout, MoreStories } from '../components';
import { LastPostCursorDocument, PostsDocument } from '../generated/graphql';
import { fetchData, fetcher, fetchSWRInfinite } from '../utils/fetcher';

let limit = 5;

export default function Home({ initialData, preview, lastPostCursor }) {
    const [cursor, setCursor] = useState('first');
    const [allPosts, setAllPosts] = useState([...initialData.posts.edges]);

    const { data, isError, isLoading, size, setSize } = fetchSWRInfinite(
        () => {
            return cursor;
        },
        {
            query: PostsDocument,
            variables: { limit, cursor },
        },
        {
            swrOptions: {
                initialData,
                initialSize: 1,
                persistSize: false,
            },
        },
    );

    const isLastPosts = allPosts && lastPostCursor === allPosts[allPosts.length - 1].cursor;
    const posts = data ? [].concat.apply([], data).concat() : [];
    const cursors =
        posts[posts.length - 1] && posts[posts.length - 1].posts
            ? posts[posts.length - 1].posts.edges.map((p) => p.cursor)
            : allPosts.map((p) => p.cursor);

    const heroPost = allPosts[0].node;
    const morePosts = allPosts?.slice(1);

    useEffect(() => {
        if (!isLastPosts) handleLoadMore();
    }, []);

    const handleLoadMore = async () => {
        if (limit % 2) limit = limit - 1;

        if (cursors) {
            setCursor(cursors ? cursors[cursors.length - 1] : cursor);
        }
        const ps = allPosts;
        const newPs = posts[0] && [...posts[0].posts.edges.map((p) => p)];

        if (ps[0] && newPs ? ps[0]?.cursor !== newPs[0]?.cursor : false) ps.push(...newPs);
        setAllPosts(ps);
    };

    if (isLoading)
        return (
            <Layout preview={preview}>
                <Container>
                    <Intro />
                    Loading...
                </Container>
            </Layout>
        );
    if (isError)
        return (
            <Layout preview={preview}>
                <Container>
                    <Intro />
                    <h2 tw="text-sm mt-10">Something went wrong ...</h2>
                </Container>
            </Layout>
        );

    if (!isError && !isLoading && !posts)
        return (
            <Layout preview={preview}>
                <Container>
                    <Intro />
                    <h2 tw="text-sm mt-10">Maintenance</h2>
                </Container>
            </Layout>
        );

    return (
        <>
            <NextSeo />
            <Layout preview={preview}>
                <Container>
                    <Intro />
                    {heroPost && (
                        <HeroPost
                            title={heroPost.title}
                            coverImage={heroPost.featuredImage?.node}
                            date={heroPost.date}
                            author={heroPost.author?.node}
                            slug={heroPost.slug}
                            excerpt={heroPost.excerpt}
                        />
                    )}
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}

                    <Box tws={tw`mb-44 flex justify-center`}>
                        {!isLastPosts && (
                            <Button
                                disabled={isLastPosts}
                                tws={tw`hover:bg-accent-7 hover:text-white transition flex justify-center items-center py-2 px-6 font-medium text-lg border-accent-7 border-solid border rounded-sm`}
                                onClick={() => {
                                    if (isLastPosts) return;
                                    setSize(size + 1);
                                    handleLoadMore();
                                }}
                            >
                                {isLastPosts ? 'End of Posts' : 'Load More Posts'}
                            </Button>
                        )}
                    </Box>
                </Container>
            </Layout>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const initialData = await fetchData({ query: PostsDocument, variables: { limit } });
    const lastPostCursorData = await fetcher({ query: LastPostCursorDocument });

    const lastPostCursor = lastPostCursorData.posts.edges[0].cursor;

    return {
        props: {
            initialData,
            preview,
            lastPostCursor,
        },
    };
};
