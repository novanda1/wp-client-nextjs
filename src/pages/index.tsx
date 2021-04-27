import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { Box, Container, HeroPost, Intro, Layout, MoreStories } from '../components';
import Button from '../components/Utils/Button';
import Loader from '../components/Utils/Loader';
import { LastPostCursorDocument, PostsDocument } from '../generated/graphql';
import { fetchData, fetcher, fetchSWRInfinite } from '../utils/fetcher';

let limit = 5;

// const Home: React.FC<{ initialData: PostFieldsFragment; preview: boolean }> = ({ initialData, preview }) => {
//     const [pageIndex, setPageIndex] = useState(1);
//     const [nextCursor, setNextCursor] = useState();

//     const getKey = (pageIndex, nextCursor) => {
//         // reached the end
//         if (!nextCursor) return { variables: { limit } };

//         // first page, we don't have `previousPageData`
//         if (pageIndex === 1) return { variables: { limit, cursor: nextCursor } };

//         // add the cursor to the API endpoint
//         return { variables: { limit, nextCursor } };
//     };

//     const { data, isError, isLoading, infiniteValue } = fetchSWR(
//         getKey(pageIndex, nextCursor),
//         {
//             query: PostsDocument,
//             variables: {
//                 limit,
//                 cursor: nextCursor ? nextCursor : '',
//             },
//             initialData,
//         },
//         { infinite: true },
//     );

//     const posts = data?.posts;

//     console.log(data);

//     const heroPost = posts?.edges[0].node;
//     const morePosts = posts?.edges?.slice(1);

//     if (isLoading)
//         return (
//             <Layout preview={preview}>
//                 <Container>
//                     <Intro />
//                     Loading...
//                 </Container>
//             </Layout>
//         );
//     if (isError)
//         return (
//             <Layout preview={preview}>
//                 <Container>
//                     <Intro />
//                     <h2 tw="text-sm mt-10">Something went wrong ...</h2>
//                 </Container>
//             </Layout>
//         );

//     if (!isError && !isLoading && !posts)
//         return (
//             <Layout preview={preview}>
//                 <Container>
//                     <Intro />
//                     <h2 tw="text-sm mt-10">I was broke a server of this site, sorry :&apos;)</h2>
//                 </Container>
//             </Layout>
//         );

//     return (
//         <>
//             <NextSeo />
//             <Layout preview={preview}>
//                 <Container>
//                     <Intro />
//                     {heroPost && (
//                         <HeroPost
//                             title={heroPost.title}
//                             coverImage={heroPost.featuredImage?.node}
//                             date={heroPost.date}
//                             author={heroPost.author?.node}
//                             slug={heroPost.slug}
//                             excerpt={heroPost.excerpt}
//                         />
//                     )}
//                     {morePosts.length > 0 && <MoreStories posts={morePosts} />}

//                     {data.posts.edges.map((p) => (
//                         <div key={p.cursor}>
//                             {p.node.title}
//                             <br />
//                         </div>
//                     ))}
//                     <button
//                         onClick={async () => {
//                             const cursors = posts.edges.map((p) => p.cursor);
//                             const nextCursor = cursors[cursors.length - 1];
//                             setNextCursor(nextCursor);
//                             setPageIndex(pageIndex + 1);
//                             infiniteValue.setSize(infiniteValue.size + 1);

//                             console.log(data);
//                         }}
//                     >
//                         load more
//                     </button>
//                 </Container>
//             </Layout>
//         </>
//     );
// };

// export default Home;

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//     const initialData = await fetchData({ query: PostsDocument, variables: { limit } });

//     return {
//         props: {
//             initialData,
//             preview,
//         },
//     };
// };

export default function Home({ initialData, preview, lastPostCursor }) {
    const [cursor, setCursor] = useState('first');
    const [allPosts, setAllPosts] = useState([...initialData.posts.edges]);

    const { data, isError, isLoading, size, setSize, isValidating } = fetchSWRInfinite(
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

    if (!isLoading && !isError) {
        <Loader />;
    }

    if (isLoading) {
        return 'load';
    }

    if (isError) {
        return 'error';
    }

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
                                tws={tw`flex justify-center items-center py-2 px-6 font-medium text-xl bg-accent-2 rounded-sm`}
                                onClick={() => {
                                    if (isLastPosts) return;
                                    setSize(size + 1);
                                    handleLoadMore();
                                }}
                            >
                                {isValidating ? <Loader /> : isLastPosts ? 'End of Posts' : 'Load More'}
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
