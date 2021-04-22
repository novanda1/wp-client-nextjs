import { CSSPropertiesToTokenScale, InternalCSS, TMedias } from '@stitches/core';
import { TwStyle } from 'twin.macro';
import { styled } from '../../stitches.config';

const BoxSt = styled('div', {});

const Box: React.FC<{
    tws?: TwStyle;
}> = ({ children, tws }) => {
    return <BoxSt css={{ ...tws }}>{children}</BoxSt>;
};

export default Box;
