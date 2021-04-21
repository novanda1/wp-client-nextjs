import 'twin.macro'

const Categories: React.FC<{ categories: any }> = ({ categories }) => {
    return (
        <span tw="ml-1">
            under
            {categories.edges.length > 0 ? (
                categories.edges.map((category, index) => (
                    <span key={index} tw="ml-1">
                        {category.node.name}
                    </span>
                ))
            ) : (
                <span tw="ml-1">{categories.edges.node.name}</span>
            )}
        </span>
    )
}

export default Categories
