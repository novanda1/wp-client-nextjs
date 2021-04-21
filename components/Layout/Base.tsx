import tw from 'twin.macro'
import Meta from '../Base/Meta'
import { Alert } from '..'
import React from 'react'

const MainContainer = tw.div`min-h-screen`

const Layout: React.FC<{ preview?: boolean }> = ({ preview, children }) => {
    return (
        <>
            <Meta />
            <MainContainer>
                <Alert preview={preview} />
                <main>{children}</main>
            </MainContainer>
        </>
    )
}

export default Layout
