import React from 'react';
import tw from 'twin.macro';
import { Span } from '..';

const Categories: React.FC<{ categories: any }> = ({ categories }) => {
    return (
        <Span tws={tw`ml-1`}>
            under
            {categories.edges.length > 0 ? (
                categories.edges.map((category, index) => (
                    <Span key={index} tws={tw`ml-1`}>
                        {category.node.name}
                    </Span>
                ))
            ) : (
                <Span tws={tw`ml-1`}>{categories.edges.node.name}</Span>
            )}
        </Span>
    );
};

export default Categories;
