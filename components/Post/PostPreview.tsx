import tw from 'twin.macro'
import { css } from '../../stitches.config'
import { Avatar, Date, CoverImage } from '..'
import Link from 'next/link'

const PostPreviewContent = css({
    ...tw`text-lg leading-relaxed mb-4`,

    p: {
        ...tw`line-clamp-4`,
    },
})

export default function PostPreview({
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
}) {
    return (
        <div>
            <div tw="mb-5">
                <CoverImage title={title} coverImage={coverImage} slug={slug} />
            </div>
            <h3 tw="text-3xl mb-3 leading-snug">
                <Link as={`/posts/${slug}`} href="/posts/[slug]">
                    <a
                        tw="hover:underline"
                        dangerouslySetInnerHTML={{ __html: title }}
                    ></a>
                </Link>
            </h3>
            <div tw="text-lg mb-4">
                <Date dateString={date} />
            </div>
            <div
                className={PostPreviewContent()}
                dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <Avatar author={author} />
        </div>
    )
}
