import Link from 'next/link';
import React from 'react';
import tw from 'twin.macro';
import { styled } from '../../../stitches.config';
import { SITE_NAME } from '../../constants';

const HeaderHeading = styled(
    'h2',
    tw`text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8`,
);

const LinkSt = styled('a', {
    ...tw`hover:underline cursor-pointer`,
});

const Header: React.FC = () => {
    return (
        <HeaderHeading>
            <Link href="/">
                <LinkSt>{SITE_NAME}</LinkSt>
            </Link>
            .
        </HeaderHeading>
    );
};

export default Header;
