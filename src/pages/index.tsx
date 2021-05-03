import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { Box, Button, Container, Intro, Layout, Page } from '../components';
import { SITE_URL } from '../constants';
import { PaginateProvider } from '../context/PaginateContext';
import { LastPostCursorDocument, PostsDocument } from '../generated/graphql';
import { fetchData, fetcher } from '../utils/fetcher';

// export default function Home({ initialData, preview, lastPostCursor }) {
//     const [cursor, setCursor] = useState('first');
//     const [allPosts, setAllPosts] = useState([...initialData.posts.edges]);

//     const { data, isError, isLoading, size, setSize } = fetchSWRInfinite(
//         () => {
//             return cursor;
//         },
//         {
//             query: PostsDocument,
//             variables: { limit, cursor },
//         },
//         {
//             swrOptions: {
//                 initialData,
//                 initialSize: 1,
//                 persistSize: false,
//                 revalidateAll: false,
//             },
//         },
//     );

//     const isLastPosts = allPosts && lastPostCursor === allPosts[allPosts.length - 1].cursor;
//     const posts = data ? [].concat.apply([], data).concat() : [];
//     const cursors =
//         posts[posts.length - 1] && posts[posts.length - 1].posts
//             ? posts[posts.length - 1].posts.edges.map((p) => p.cursor)
//             : allPosts.map((p) => p.cursor);

//     const heroPost = allPosts[0].node;
//     const morePosts = allPosts?.slice(1);

//     useEffect(() => {
//         if (!isLastPosts) handleLoadMore();
//     }, []);

//     const handleLoadMore = async () => {
//         if (limit % 2) limit = limit - 1;

//         if (cursors) {
//             setCursor(cursors ? cursors[cursors.length - 1] : cursor);
//         }
//         const ps = allPosts;
//         const newPs = posts[0] && [...posts[0].posts.edges.map((p) => p)];

//         if (ps[0] && newPs ? ps[0]?.cursor !== newPs[0]?.cursor : false) ps.push(...newPs);
//         setAllPosts(ps);
//     };

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
//                     <h2 tw="text-sm mt-10">Maintenance</h2>
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

//                     <Box tws={tw`mb-44 flex justify-center`}>
//                         {!isLastPosts && (
//                             <Button
//                                 disabled={isLastPosts}
//                                 tws={tw`hover:bg-accent-7 hover:text-white transition flex justify-center items-center py-2 px-6 font-medium text-lg border-accent-7 border-solid border rounded-sm`}
//                                 onClick={() => {
//                                     if (isLastPosts) return;
//                                     setSize(size + 1);
//                                     handleLoadMore();
//                                 }}
//                             >
//                                 {isLastPosts ? 'End of Posts' : 'Load More Posts'}
//                             </Button>
//                         )}
//                     </Box>
//                 </Container>
//             </Layout>
//         </>
//     );
// }

export const getStaticProps: GetStaticProps = async ({ preview = false, previewData }) => {
    const initialData = await fetchData({ query: PostsDocument, variables: { limit: 5 } });
    const lastPostCursorData = await fetcher({ query: LastPostCursorDocument });
    const lastPostCursor = lastPostCursorData.posts.edges[0].cursor;

    console.log(`previewData`, previewData);

    return {
        props: {
            initialData,
            preview,
            lastPostCursor,
            limit: 5,
        },
    };
};

export default function Home({ preview, initialData, lastPostCursor, limit }) {
    const router = useRouter();
    const [cursor, setCursor] = useState('first');
    const [page, setPage] = useState(0);
    const pages = [<Page key={-1} index={-1} />];

    for (let i = 0; i < page; i++) {
        pages.push(<Page key={i} index={i} />);
    }

    return (
        <Layout preview={preview}>
            <Container>
                <Intro />

                <PaginateProvider
                    value={{
                        initialData,
                        limit: 5,
                        cursor,
                        onChangeCursor: (newCursor: string) => {
                            setCursor(newCursor);
                        },
                    }}
                >
                    {pages}
                </PaginateProvider>

                <Box tws={tw`mb-44 flex justify-center`}>
                    {cursor !== lastPostCursor && (
                        <Button
                            disabled={false}
                            tws={tw`hover:bg-accent-7 hover:text-white transition flex justify-center items-center py-2 px-6 font-medium text-lg border-accent-7 border-solid border rounded-sm`}
                            onClick={async () => {
                                await router.push(`/?page=${page + 1}`, undefined, { shallow: true });
                                await fetch(SITE_URL + `/api/page-limit/?page${page + 1}`);

                                setPage(page + 1);
                            }}
                        >
                            Load More Posts
                        </Button>
                    )}
                </Box>
            </Container>
        </Layout>
    );
}
