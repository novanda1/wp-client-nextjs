import { Container, HeroPostAndMorePosts, Layout } from '@/components/index';
import { InfinitePageProvider } from 'context/InfinitePageContext';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { LastPostCursorDocument, PostsDocument, PostsQuery } from '../../generated/graphql';
import { fetchData } from '../../utils/fetcher';

const Posts = ({ page, initialData, lastPostCursor }) => {
    // const currentPosts = currentData();
    const router = useRouter();

    const [cursor, setCursor] = useState('first');
    const [isLastPage, setIsLastPage] = useState(false);
    const [element, setElement] = useState(null);

    const observer = useRef<IntersectionObserver>();
    const prevY = useRef(0);

    const result: PostsQuery = initialData;
    const heroPost = result.posts?.edges[0]?.node;
    const morePosts = result.posts?.edges?.slice(1);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (prevY.current > y) {
                    console.log('to next');
                    router.push(`/posts/${page + 1}`, undefined, { scroll: false });
                }
                prevY.current = y;
            },
            { threshold: 0.5 },
        );
    }, []);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }
        // set last post page when cursor same
        if (cursor === lastPostCursor) setIsLastPage(true);

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);

    console.log(`isLastPage`, isLastPage);

    return (
        <Layout>
            <Container>
                helo
                <InfinitePageProvider
                    value={{
                        cursor,
                        lastCursor: lastPostCursor,
                        onLastCursor: (cursor) => {
                            setCursor(cursor);
                        },
                    }}
                >
                    <HeroPostAndMorePosts index={0} morePosts={morePosts} heroPost={heroPost}></HeroPostAndMorePosts>
                </InfinitePageProvider>
                <button
                    onClick={() => {
                        console.log(`router`, page);
                        router.push(`/posts/${page + 1}`, undefined, { scroll: false });
                    }}
                >
                    {cursor !== lastPostCursor ? (
                        <h1 ref={setElement}>Loading Posts...</h1>
                    ) : (
                        <h1>No more posts available...</h1>
                    )}
                </button>
            </Container>
        </Layout>
    );
};

export default Posts;

// Posts.getInitialProps = ({ query }) => {
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const initialLimit = 5;
    const getLimit = +params.page > 1 ? +params.page * 5 - 1 : initialLimit;
    const lastPostCursorData = await fetchData({ query: LastPostCursorDocument });
    const lastPostCursor = lastPostCursorData.posts.edges[0].cursor;

    const posts = await fetchData({
        query: PostsDocument,
        variables: {
            limit: getLimit,
        },
    });

    return {
        props: {
            page: +params.page,
            initialData: posts,
            lastPostCursor,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const limitPage = 100;
    const page = [];
    for (let i = 0; i < limitPage; i++) {
        page.push(`/posts/${i + 1}`);
    }

    return {
        paths: [...page],
        fallback: false,
    };
};
