import tw from 'twin.macro'
import { Box, Heading, PostPreview } from '..'

export default function MoreStories({ posts }) {
    return (
        <section>
            <Heading element="h2" tws={tw`mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight`}>
                More Stories
            </Heading>
            <Box tws={tw`grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32`}>
                {posts.map(({ node }) => (
                    <PostPreview
                        key={node.slug}
                        title={node.title}
                        coverImage={node.featuredImage?.node}
                        date={node.date}
                        author={node.author?.node}
                        slug={node.slug}
                        excerpt={node.excerpt}
                    />
                ))}
            </Box>
        </section>
    )
}
