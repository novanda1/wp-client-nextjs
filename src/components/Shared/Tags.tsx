import React from 'react';
import tw from 'twin.macro';
import { Box, Span } from '..';

const Tags: React.FC<{ tags: any }> = ({ tags }) => {
    return (
        <Box tws={tw`max-w-2xl mx-auto`}>
            <Span element="p" tws={tw`mt-8 text-lg font-bold`}>
                Tagged
                {tags.edges.map((tag, index) => (
                    <span key={index} tw="ml-4 font-normal">
                        {tag.node.name}
                    </span>
                ))}
            </Span>
        </Box>
    );
};

export default Tags;
