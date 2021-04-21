import tw from 'twin.macro'

const PostTitleElement = tw.h1`
    text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left
`
export default function PostTitle({ children }) {
    return <PostTitleElement dangerouslySetInnerHTML={{ __html: children }} />
}
