import tw from 'twin.macro'
import { css } from '../../stitches.config'

const PostTitleSt = css(tw`
    text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left
`)
export default function PostTitle({ children }) {
    return (
        <h1
            className={PostTitleSt()}
            dangerouslySetInnerHTML={{ __html: children }}
        ></h1>
    )
}
