import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { Container, HeroPost, Intro, Layout, MoreStories } from '../components';
import { fetchData, fetchSWR } from '../utils/fetcher';
import { PostFieldsFragment, PostsDocument } from '../generated/graphql';
import { isServer } from '../utils/isServer';

const isUseInfinite = true;
const limit = 2;

const Home: React.FC<{ initialData: PostFieldsFragment; preview: boolean }> = ({ initialData, preview }) => {
    const [pageIndex, setPageIndex] = useState(1);
    const [nextCursor, setNextCursor] = useState();

    const getKey = (pageIndex, nextCursor) => {
        // reached the end
        if (!nextCursor) return { variables: { limit } };

        // first page, we don't have `previousPageData`
        if (pageIndex === 1) return { variables: { limit, cursor: nextCursor } };

        // add the cursor to the API endpoint
        return { variables: { limit, nextCursor } };
    };

    const { data, isError, isLoading, infiniteValue } = fetchSWR(
        getKey(pageIndex, nextCursor),
        {
            query: PostsDocument,
            variables: {
                limit,
                cursor: nextCursor ? nextCursor : '',
            },
            initialData,
        },
        { infinite: true },
    );

    const posts = data?.posts;

    console.log(data);

    const heroPost = posts?.edges[0].node;
    const morePosts = posts?.edges?.slice(1);

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
                    <h2 tw="text-sm mt-10">I was broke a server of this site, sorry :&apos;)</h2>
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

                    {data.posts.edges.map((p) => (
                        <div key={p.cursor}>
                            {p.node.title}
                            <br />
                        </div>
                    ))}
                    <button
                        onClick={async () => {
                            const cursors = posts.edges.map((p) => p.cursor);
                            const nextCursor = cursors[cursors.length - 1];
                            setNextCursor(nextCursor);
                            setPageIndex(pageIndex + 1);
                            infiniteValue.setSize(infiniteValue.size + 1);

                            console.log(data);
                        }}
                    >
                        load more
                    </button>
                </Container>
            </Layout>
        </>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const initialData = await fetchData({ query: PostsDocument, variables: { limit } });

    return {
        props: {
            initialData,
            preview,
        },
    };
};

// import { useSWRInfinite } from 'swr';

// const fetcher = (url) => fetch(url).then((res) => res.json());
// const PAGE_SIZE = 6;

// export default function App() {
//     const [repo, setRepo] = useState('reactjs/react-a11y');
//     const [val, setVal] = useState(repo);

//     const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
//         (index) => `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${index + 1}`,
//         fetcher,
//     );

//     const issues = data ? [].concat(...data) : [];
//     const isLoadingInitialData = !data && !error;
//     const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
//     const isEmpty = data?.[0]?.length === 0;
//     const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
//     const isRefreshing = isValidating && data && data.length === size;

//     return (
//         <div style={{ fontFamily: 'sans-serif' }}>
//             <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="reactjs/react-a11y" />
//             <button
//                 onClick={() => {
//                     setRepo(val);
//                     setSize(1);
//                 }}
//             >
//                 load issues
//             </button>
//             <p>
//                 showing {size} page(s) of {isLoadingMore ? '...' : issues.length} issue(s){' '}
//                 <button disabled={isLoadingMore || isReachingEnd} onClick={() => setSize(size + 1)}>
//                     {isLoadingMore ? 'loading...' : isReachingEnd ? 'no more issues' : 'load more'}
//                 </button>
//                 <button disabled={isRefreshing} onClick={() => mutate()}>
//                     {isRefreshing ? 'refreshing...' : 'refresh'}
//                 </button>
//                 <button disabled={!size} onClick={() => setSize(0)}>
//                     clear
//                 </button>
//             </p>
//             {isEmpty ? <p>Yay, no issues found.</p> : null}
//             {issues.map((issue) => {
//                 return (
//                     <p key={issue.id} style={{ margin: '6px 0' }}>
//                         - {issue.title}
//                     </p>
//                 );
//             })}
//         </div>
//     );
// }
