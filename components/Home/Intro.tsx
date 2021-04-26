import React from 'react';
import tw from 'twin.macro';
import { SITE_DESCRIPTION, SITE_NAME } from '../../lib/constants';
import { styled } from '../../stitches.config';

const IntroSection = styled(
    'section',
    tw`flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12`,
);

const IntroTitle = styled('h1', tw`text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8`);

const IntroDescription = styled('h4', tw`text-center md:text-left text-lg mt-5 md:pl-8`);

const Intro: React.FC = () => {
    return (
        <IntroSection>
            <IntroTitle>{SITE_NAME}.</IntroTitle>
            <IntroDescription>{SITE_DESCRIPTION}.</IntroDescription>
        </IntroSection>
    );
};

export default Intro;
