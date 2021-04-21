import tw from 'twin.macro'
import { css } from '../../stitches.config'

const PostBodyComponent = css({
    ...tw`text-lg leading-relaxed`,

    'p, ul, ol, blockquote': {
        ...tw`my-6`,
    },

    a: {
        ...tw`underline`,
    },

    'ul, ol': {
        ...tw` pl-4`,
    },

    ul: {
        ...tw`list-disc`,
    },

    ol: {
        ...tw`list-decimal`,
    },

    'ul > li > ul,\
    ol > li > ol': {
        ...tw`my-0 ml-4`,
    },

    'ul li ul': {
        listStyle: 'cirlce',
    },

    h2: {
        ...tw`text-3xl mt-12 mb-4 leading-snug`,
    },

    h3: {
        ...tw`text-2xl mt-8 mb-4 leading-snug`,
    },

    h4: {
        ...tw`text-xl mt-6 mb-4 leading-snug`,
    },

    pre: {
        ...tw`whitespace-pre overflow-x-auto p-4 text-sm leading-tight border border-gray-400 bg-gray-100`,
    },

    code: {
        ...tw`text-sm`,
    },

    figcaption: {
        ...tw`text-center text-sm`,
    },

    blockquote: {
        ...tw`border-l-4 border-gray-500 bg-gray-200 italic ml-0 py-4 px-6`,

        p: {
            ...tw`mt-0`,
        },
        cite: {
            ...tw`not-italic`,
        },
    },

    audio: {
        ...tw`w-full`,
    },

    '.wp-block-cover': {
        ...tw`relative`,

        '&__inner-container': {
            ...tw`inset-0 flex justify-center items-center`,
        },
    },
})

export default function PostBody({ content }) {
    return (
        <div tw="max-w-2xl mx-auto">
            <div
                className={PostBodyComponent()}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    )
}
