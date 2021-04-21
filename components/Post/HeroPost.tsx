import tw from 'twin.macro'
import { css } from '../../stitches.config'

import Link from 'next/link'
import { Avatar, Date, CoverImage } from '..'

const HeroPostExcerp = css({
    ...tw`text-lg leading-relaxed mb-4`,

    p: {
        ...tw`line-clamp-4`,
    },
})

export default function HeroPost({
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
}) {
    return (
        <section>
            <div tw="mb-8 md:mb-16">
                {coverImage && (
                    <CoverImage
                        title={title}
                        coverImage={coverImage}
                        slug={slug}
                    />
                )}
            </div>
            <div tw="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
                <div>
                    <h3 tw="mb-4 text-4xl lg:text-6xl leading-tight">
                        <Link as={`/posts/${slug}`} href="/posts/[slug]">
                            <a
                                tw="hover:underline"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                        </Link>
                    </h3>
                    <div tw="mb-4 md:mb-0 text-lg">
                        <Date dateString={date} />
                    </div>
                </div>
                <div>
                    <div
                        className={HeroPostExcerp()}
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                    <Avatar author={author} />
                </div>
            </div>
        </section>
    )
}
