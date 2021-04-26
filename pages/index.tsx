import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Container, HeroPost, Intro, Layout, MoreStories } from '../components';
import { fetchData, fetchSWR } from '../lib/api';
import { PostFieldsFragment, PostsDocument } from '../lib/generated/graphql';

const Home: React.FC<{ initialData: PostFieldsFragment }> = ({ initialData }) => {
    const { data, isError, isLoading } = fetchSWR(PostsDocument, {
        query: PostsDocument,
        initialData,
    });
    const posts = data?.posts;

    const heroPost = posts?.edges[0].node;
    const morePosts = posts?.edges?.slice(1);

    if (isLoading)
        return (
            <Layout>
                <Container>
                    <Intro />
                    Loading...
                </Container>
            </Layout>
        );
    if (isError)
        return (
            <Layout>
                <Container>
                    <Intro />
                    <h2 tw="text-sm mt-10">Something went wrong ...</h2>
                </Container>
            </Layout>
        );

    if (!isError && !isLoading && !posts)
        return (
            <Layout>
                <Container>
                    <Intro />
                    <h2 tw="text-sm mt-10">I was broke a server of this site, sorry :&apos;)</h2>
                </Container>
            </Layout>
        );

    return (
        <>
            <NextSeo />
            <Layout>
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

export const getStaticProps: GetStaticProps = async () => {
    const initialData = await fetchData({ query: PostsDocument });

    return {
        props: {
            initialData,
        },
    };
};
