import tw from 'twin.macro'
import { styled } from '../../stitches.config'
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

export default function Alert({ preview }) {
    return (
        <AlertContainer preview={preview}>
            <Container>
                <div tw="py-2 text-center text-sm">
                    This is page is a preview.{' '}
                    <a
                        href="/api/exit-preview"
                        tw="underline hover:text-cyan duration-200 transition-colors"
                    >
                        Click here
                    </a>{' '}
                    to exit preview mode.
                </div>
            </Container>
        </AlertContainer>
    )
}
