import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useMemo } from "react";
import {
  Container,
  PostBody,
  MoreStories,
  Header,
  PostHeader,
  SectionSeparator,
  Layout,
  PostTitle,
  Tags,
} from "../../components";
import { fetchData, fetchSWR } from "../../lib/api";
import {
  PostAndMorePostsDocument,
  PostsSlugDocument,
} from "../../lib/generated/graphql";

export default function Post(props) {
  const id = props.uri
  const { data, isLoading, isError } = fetchSWR({
      variables: useMemo(() => {return { id, idType: 'SLUG', isRevision: false }}, []),
      query: PostAndMorePostsDocument,
      initialData: props.data,
      isUseToken: true
  })

  const post = data?.post
  const posts = data?.posts

  const morePosts = posts?.edges.filter(
      (post) => post.node.slug !== props.uri
  )

  const {
      title,
      metaDesc,
      metaRobotsNoindex,
      metaRobotsNofollow,
      opengraphDescription,
      opengraphTitle,
      opengraphImage,
      opengraphSiteName,
  } = post?.seo || {}

  const currentLocation = process.browser ? window.location.origin : null
  const opengraphUrl =
      (process.env.SITE_URL ? process.env.SITE_URL : currentLocation) +
      '/posts/' +
      props?.uri?.slug

  if (isLoading)
      return (
          <Layout preview={props.preview}>
              <Container>
                  <Header>
                      <PostTitle>Loading…</PostTitle>
                  </Header>
              </Container>
          </Layout>
      )

  if (isError)
      return (
          <Layout preview={props.preview}>
              <Container>
                  <Header>
                      <PostTitle>Hmm something went wrong...</PostTitle>
                  </Header>
              </Container>
          </Layout>
      )

  if (!isError && !isLoading && !post?.title)
      return (
          <Layout preview={props.preview}>
              <Container>
                  <Header>
                      <PostTitle>Are you lost? where are you from?</PostTitle>
                  </Header>
              </Container>
          </Layout>
      )

  if (!isError && !isLoading)
      return (
          <>
              <NextSeo
                  title={title}
                  description={opengraphDescription || metaDesc}
                  canonical={opengraphUrl}
                  noindex={metaRobotsNoindex}
                  nofollow={metaRobotsNofollow}
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
              <Layout preview={props.preview}>
                  <Container>
                      <Header />
                      <>
                          <article>
                              <PostHeader
                                  title={post.title}
                                  coverImage={post.featuredImage?.node}
                                  date={post.date}
                                  author={post.author?.node}
                                  categories={post.categories}
                              />
                              <PostBody content={post.content} />
                              <footer>
                                  {post.tags.edges.length > 0 && (
                                      <Tags tags={post.tags} />
                                  )}
                              </footer>
                          </article>

                          <SectionSeparator />
                          {morePosts.length > 0 && (
                              <MoreStories posts={morePosts} />
                          )}
                      </>
                  </Container>
              </Layout>
          </>
      )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData })  => {
    const postPreview = preview && previewData?.post
    // The slug may be the id of an unpublished post
    const isId = Number.isInteger(Number(params.slug))
    const isSamePost = isId
        ? Number(params.slug) === postPreview.id
        : params.slug === postPreview.slug
    const isDraft = isSamePost && postPreview?.status === 'draft'
    const isRevision = isSamePost && postPreview?.status === 'publish'

    const id = isDraft ? postPreview.id : params.slug
    const idType = isDraft ? 'DATABASE_ID' : 'SLUG'

    const data  = await fetchData({
        query: PostAndMorePostsDocument,
        variables: { id ,idType, isRevision },
        // isUseToken: true
    })

    console.log(data);
    

    return {
        props: {
            preview,
            uri: params.slug,
            data: data,
        },
    }   
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {posts} = await fetchData({ query: PostsSlugDocument });

  return {
    paths: [...posts.edges.map(({ node }) => `/posts/${node.slug}`)],
    fallback: true,
  };
};
