import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import {
    Container,
    Header,
    Layout,
    MoreStories,
    PostBody,
    PostHeader,
    PostTitle,
    SectionSeparator,
    Tags,
} from '../../components';
import { fetchData, fetchStatic, fetchSWR } from '../../utils/fetcher';
import { PostAndMorePostsDocument, PostAndMorePostsQuery, PostsSlugDocument } from '../../generated/graphql';

interface PostPropsInterface {
    preview: boolean;
    uri: string;
    data: PostAndMorePostsQuery;
    token?: string;
    isRevision?: boolean;
}

const Post: React.FC<PostPropsInterface> = ({ data: { post, posts }, preview, uri, token, isRevision }) => {
    const id = uri;
    const initialData = { post, posts };

    const { data, isLoading, isError } = fetchSWR(
        id,
        {
            variables: { id, idType: 'SLUG', isRevision },
            query: PostAndMorePostsDocument,
            initialData: initialData,
            isUseToken: preview,
        },
        {
            token,
        },
    );

    const morePosts = posts?.edges.filter((post) => post.node.slug !== uri);

    const {
        title,
        metaDesc,
        metaRobotsNoindex,
        metaRobotsNofollow,
        opengraphDescription,
        opengraphTitle,
        opengraphImage,
        opengraphSiteName,
    } = post?.seo || {};

    const currentLocation = process.browser ? window.location.origin : null;
    const opengraphUrl = (process.env.SITE_URL ? process.env.SITE_URL : currentLocation) + '/post/' + uri;

    if (isLoading && !post) return;
    <Layout preview={preview}>
        <Container>
            <Header>
                <PostTitle>Loading...</PostTitle>
            </Header>
        </Container>
    </Layout>;

    if (isError)
        return (
            <Layout preview={preview}>
                <Container>
                    <Header>
                        <PostTitle>Can&apos;t find the post...</PostTitle>
                    </Header>
                </Container>
            </Layout>
        );

    if (!isError && !isLoading && !data?.post?.title)
        return (
            <Layout preview={false}>
                <Container>
                    <Header></Header>
                    <PostTitle>Can&apos;t find the post</PostTitle>
                </Container>
            </Layout>
        );

    return (
        <>
            <NextSeo
                title={title}
                description={opengraphDescription || metaDesc}
                canonical={opengraphUrl}
                noindex={metaRobotsNoindex === 'index' ? true : false}
                nofollow={metaRobotsNofollow === 'follow' ? true : false}
                openGraph={{
                    url: opengraphUrl,
                    title: opengraphTitle,
                    description: opengraphDescription,
                    images: [
                        {
                            url: opengraphImage?.sourceUrl,
                            width: 1280,
                            height: 720,
                        },
                    ],
                    site_name: opengraphSiteName,
                }}
                twitter={{
                    handle: '@Codeytek',
                    site: '@Codeytek',
                    cardType: 'summary_large_image',
                }}
            />
            <Layout preview={preview}>
                <Container>
                    <Header />
                    <>
                        <article>
                            <PostHeader
                                title={data.post.title}
                                coverImage={data.post.featuredImage?.node}
                                date={data.post.date}
                                author={data.post.author?.node}
                                categories={data.post.categories}
                            />
                            <PostBody content={data.post.content} />
                            <footer>{data.post.tags.edges.length > 0 && <Tags tags={data.post.tags} />}</footer>
                        </article>

                        <SectionSeparator />
                        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                    </>
                </Container>
            </Layout>
        </>
    );
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
    const postPreview = preview && previewData?.post;
    // The slug may be the id of an unpublished post
    const isId = Number.isInteger(Number(params.slug));
    const isSamePost = isId ? Number(params.slug) === postPreview.id : params.slug === postPreview.slug;
    const isDraft = isSamePost && postPreview?.status === 'draft';
    const isRevision = isSamePost && postPreview?.status === 'publish';

    const id = isDraft ? postPreview.id : params.slug;
    const idType = isDraft ? 'DATABASE_ID' : 'SLUG';

    const data = await fetchStatic(
        {
            query: PostAndMorePostsDocument,
            variables: { id, idType, isRevision },
            isUseToken: preview ? true : false,
        },
        preview && previewData?.token,
    );

    return {
        props: {
            preview,
            uri: params.slug,
            data: data,
            token: preview ? previewData?.token : null,
            isRevision: isRevision ? true : false,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { posts } = await fetchData({ query: PostsSlugDocument, variables: { morePostLength: 50 } });

    return {
        paths: [...posts.edges.map(({ node }) => `/post/${node.slug}`)],
        fallback: false,
    };
};
