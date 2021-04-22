import tw from 'twin.macro'
import { Span } from '..'
import { css } from '../../stitches.config'

const Categories: React.FC<{ categories: any }> = ({ categories }) => {
    return (
        <Span css={tw`ml-1`}>
            under
            {categories.edges.length > 0 ? (
                categories.edges.map((category, index) => (
                    <Span key={index} css={tw`ml-1`}>
                        {category.node.name}
                    </Span>
                ))
            ) : (
                <Span css={tw`ml-1`}>{categories.edges.node.name}</Span>
            )}
        </Span>
    )
}

export default Categories
