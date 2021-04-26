import React from 'react';
import { TwStyle } from 'twin.macro';
import { styled } from '../../../stitches.config';

const HeadingSt = styled('h1', {});

const Heading: React.FC<{
    css?: string;
    tws?: TwStyle;
    element?: keyof JSX.IntrinsicElements;
}> = ({ children, css, tws, element }) => {
    return (
        <HeadingSt css={{ css, ...tws }} as={element}>
            {children}
        </HeadingSt>
    );
};

export default Heading;
