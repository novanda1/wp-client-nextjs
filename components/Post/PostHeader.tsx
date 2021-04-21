import 'twin.macro'

import { Avatar, Date, CoverImage, PostTitle, Categories } from '..'

export default function PostHeader({
    title,
    coverImage,
    date,
    author,
    categories,
}) {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div tw="hidden md:block md:mb-12">
                <Avatar author={author} />
            </div>
            <div tw="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={title} coverImage={coverImage} />
            </div>
            <div tw="max-w-2xl mx-auto">
                <div tw="block md:hidden mb-6">
                    <Avatar author={author} />
                </div>
                <div tw="mb-6 text-lg">
                    Posted <Date dateString={date} />
                    <Categories categories={categories} />
                </div>
            </div>
        </>
    )
}
