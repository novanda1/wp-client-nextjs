import tw from 'twin.macro'
import { styled } from '../../stitches.config'
import Link from 'next/link'
import { SITE_NAME } from '../../lib/constants'
import React from 'react'

const HeaderHeading = styled(
    'h2',
    tw`text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8`
)

const Header: React.FC<{}> = () => {
    return (
        <HeaderHeading>
            <Link href="/">
                <a tw="hover:underline">{SITE_NAME}</a>
            </Link>
            .
        </HeaderHeading>
    )
}

export default Header
