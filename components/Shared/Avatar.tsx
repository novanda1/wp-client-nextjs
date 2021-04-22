import tw from 'twin.macro'
import { styled } from '../../stitches.config'

const AvatarContainer = styled('div', tw`flex items-center`)
const AvatarImage = styled('img', tw`w-12 h-12 rounded-full mr-4`)
const AvatarName = styled('div', tw`text-xl font-bold`)

export default function Avatar({ author }) {
    const name = author
        ? author.firstName && author.lastName
            ? `${author.firstName} ${author.lastName}`
            : author.name
        : null

    return (
        <>
            {author && (
                <AvatarContainer>
                    <AvatarImage src={author.avatar.url} alt={name} />
                    <AvatarName>{name}</AvatarName>
                </AvatarContainer>
            )}
        </>
    )
}
