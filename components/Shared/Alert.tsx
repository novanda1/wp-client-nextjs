import tw from 'twin.macro'
import { styled, css } from '../../stitches.config'
import { Container } from '..'

const AlertContainer = styled('div', {
    ...tw`border-b`,

    variants: {
        preview: {
            true: tw`bg-accent-7 border-accent-7 text-white`,
            false: tw`bg-accent-1 border-accent-2`,
        },
    },
})

const AlertContentSt = css(tw`py-2 text-center text-sm`)
const AlertLinkSt = css(
    tw`underline hover:text-cyan duration-200 transition-colors`
)

export default function Alert({ preview }) {
    return (
        <AlertContainer preview={preview}>
            <Container>
                <div className={AlertContentSt()}>
                    This is page is a preview.{' '}
                    <a className={AlertLinkSt()} href="/api/exit-preview">
                        Click here
                    </a>{' '}
                    to exit preview mode.
                </div>
            </Container>
        </AlertContainer>
    )
}
