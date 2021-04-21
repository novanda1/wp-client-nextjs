import 'twin.macro'
import Link from 'next/link'
import { SITE_NAME } from '../../lib/constants'
import React from 'react'

const Header: React.FC<{}> = () => {
    return (
        <h2 tw="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
            <Link href="/">
                <a tw="hover:underline">{SITE_NAME}</a>
            </Link>
            .
        </h2>
    )
}

export default Header
