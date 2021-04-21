import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
// import ErrorPage from 'next/error'
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
} from '../../components'
import { fetcher, fetchSWR } from '../../lib/api'
import {
    PostAndMorePostsDocument,
    PostsSlugDocument,
} from '../../lib/generated/graphql'

export default function Post(props) {
    const router = useRouter()
    const { slug } = router.query

    const main = () => {
        const { data, isLoading, isError } = fetchSWR({
            variables: { id: slug, idType: 'SLUG', isRevision: false },
            query: PostAndMorePostsDocument,
        })

        return { data, isError, isLoading }
    }

    console.log(main())

    return 'ok'

    // const post = data?.post
    // const posts = data?.posts

    // const morePosts = posts?.edges.filter(
    //     (post) => post.node.slug !== props.uri
    // )

    // const {
    //     title,
    //     metaDesc,
    //     metaRobotsNoindex,
    //     metaRobotsNofollow,
    //     opengraphDescription,
    //     opengraphTitle,
    //     opengraphImage,
    //     opengraphSiteName,
    // } = post?.seo || {}

    // const currentLocation = process.browser ? window.location.origin : null
    // const opengraphUrl =
    //     (process.env.SITE_URL ? process.env.SITE_URL : currentLocation) +
    //     '/posts/' +
    //     props?.uri?.slug

    // if (isLoading)
    //     return (
    //         <Layout>
    //             <Container>
    //                 <Header>
    //                     <PostTitle>Loading…</PostTitle>
    //                 </Header>
    //             </Container>
    //         </Layout>
    //     )

    // if (isError)
    //     return (
    //         <Layout>
    //             <Container>
    //                 <Header>
    //                     <PostTitle>Hmm something went wrong...</PostTitle>
    //                 </Header>
    //             </Container>
    //         </Layout>
    //     )

    // if (!isError && !isLoading && !post?.title)
    //     return (
    //         <Layout>
    //             <Container>
    //                 <Header>
    //                     <PostTitle>Are you lost? where are you from?</PostTitle>
    //                 </Header>
    //             </Container>
    //         </Layout>
    //     )

    // if (!isError && !isLoading)
    //     return (
    //         <>
    //             <NextSeo
    //                 title={title}
    //                 description={opengraphDescription || metaDesc}
    //                 canonical={opengraphUrl}
    //                 noindex={metaRobotsNoindex}
    //                 nofollow={metaRobotsNofollow}
    //                 openGraph={{
    //                     url: opengraphUrl,
    //                     title: opengraphTitle,
    //                     description: opengraphDescription,
    //                     images: [
    //                         {
    //                             url: opengraphImage?.sourceUrl,
    //                             width: 1280,
    //                             height: 720,
    //                         },
    //                     ],
    //                     site_name: opengraphSiteName,
    //                 }}
    //                 twitter={{
    //                     handle: '@Codeytek',
    //                     site: '@Codeytek',
    //                     cardType: 'summary_large_image',
    //                 }}
    //             />
    //             <Layout preview={props.preview}>
    //                 <Container>
    //                     <Header />
    //                     <>
    //                         <article>
    //                             <PostHeader
    //                                 title={post.title}
    //                                 coverImage={post.featuredImage?.node}
    //                                 date={post.date}
    //                                 author={post.author?.node}
    //                                 categories={post.categories}
    //                             />
    //                             <PostBody content={post.content} />
    //                             <footer>
    //                                 {post.tags.edges.length > 0 && (
    //                                     <Tags tags={post.tags} />
    //                                 )}
    //                             </footer>
    //                         </article>

    //                         <SectionSeparator />
    //                         {morePosts.length > 0 && (
    //                             <MoreStories posts={morePosts} />
    //                         )}
    //                     </>
    //                 </Container>
    //             </Layout>
    //         </>
    //     )
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const { data } = await fetcher({
        query: PostAndMorePostsDocument,
        variables: { id: params.slug, idType: 'SLUG', isRevision: false },
    })

    console.log('----------------------------', data)

    return {
        props: {
            preview,
            uri: params.slug,
            // data: data,
        },
    }
}

export async function getStaticPaths() {
    const allPosts = (await fetcher({ query: PostsSlugDocument })) || {}

    console.log('all', allPosts)

    return {
        paths: allPosts?.edges?.map(({ node }) => `/posts/${node.slug}`) || [],
        fallback: true,
    }
}
