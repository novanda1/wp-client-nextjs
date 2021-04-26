import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Container, HeroPost, Intro, Layout, MoreStories } from '../components';
import { fetchData, fetchSWR } from '../utils/fetcher';
import { PostFieldsFragment, PostsDocument } from '../generated/graphql';

const Home: React.FC<{ initialData: PostFieldsFragment; preview: boolean }> = ({ initialData, preview }) => {
    const { data, isError, isLoading } = fetchSWR(PostsDocument, {
        query: PostsDocument,
        initialData,
    });
    const posts = data?.posts;

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
                </Container>
            </Layout>
        </>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const initialData = await fetchData({ query: PostsDocument });

    return {
        props: {
            initialData,
            preview,
        },
    };
};
