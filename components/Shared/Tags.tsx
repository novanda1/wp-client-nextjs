import 'twin.macro'

export default function Tags({ tags }) {
    return (
        <div tw="max-w-2xl mx-auto">
            <p tw="mt-8 text-lg font-bold">
                Tagged
                {tags.edges.map((tag, index) => (
                    <span key={index} tw="ml-4 font-normal">
                        {tag.node.name}
                    </span>
                ))}
            </p>
        </div>
    )
}
