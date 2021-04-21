import Link from 'next/link'
import tw from 'twin.macro'
import { styled } from '../../stitches.config'

const Image = styled('img', {
    ...tw`shadow-small`,
    variants: {
        hasHover: {
            true: tw`shadow-small hover:shadow-medium transition-shadow duration-200`,
        },
    },
})

const CoverImage: React.FC<{
    title: string
    coverImage: any
    slug?: string
}> = ({ title, coverImage, slug }) => {
    return (
        <div tw="sm:mx-0">
            {slug ? (
                <Link as={`/posts/${slug}`} href="/posts/[slug]">
                    <a>
                        <Image
                            src={coverImage?.sourceUrl}
                            hasHover
                            alt={title}
                        />
                    </a>
                </Link>
            ) : (
                <Image src={coverImage?.sourceUrl} alt={title} />
            )}
        </div>
    )
}

export default CoverImage
