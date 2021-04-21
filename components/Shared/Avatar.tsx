import tw from 'twin.macro'

const AvatarContainer = tw.div`flex items-center`
const AvatarImage = tw.img`w-12 h-12 rounded-full mr-4`
const AvatarName = tw.div`text-xl font-bold`

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
