import React from 'react';
import { TwStyle } from 'twin.macro';
import { keyframes, styled } from '../../../stitches.config';

const ldsKeyframe = keyframes({
    '0%': {
        top: '8px',
        height: '64px',
    },
    '50%, 100%': {
        top: '24px',
        height: ' 32px',
    },
});

const LoaderSt = styled('div', {
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '80px',

    div: {
        display: ' inline-block',
        position: 'absolute',
        left: '8px',
        width: '16px',
        backgroundColor: '#333',
        animation: `${ldsKeyframe} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite`,

        '&:nth-child(1)': {
            left: '8px',
            animationDelay: '-0.24s',
        },

        '&:nth-child(2)': {
            left: '32px',
            animationDelay: '-0.12s',
        },

        '&:nth-child(3)': {
            left: '56px',
            animationDelay: '0',
        },
    },
});

const Loader: React.FC<{
    css?: string;
    tws?: TwStyle;
    element?: keyof JSX.IntrinsicElements;
}> = ({ css, tws, element }) => {
    return (
        <div>
            <LoaderSt css={{ css, ...tws }} as={element}>
                <div></div>
                <div></div>
                <div></div>
            </LoaderSt>
        </div>
    );
};

export default Loader;
