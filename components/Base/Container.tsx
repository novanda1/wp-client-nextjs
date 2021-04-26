import React from 'react';
import tw from 'twin.macro';
import { css } from '../../stitches.config';

const ContainerSt = css(tw`container mx-auto px-5 2xl:max-w-screen-xl`);

const Container: React.FC = ({ children }) => {
    return <div className={ContainerSt()}>{children}</div>;
};

export default Container;
