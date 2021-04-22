import tw from 'twin.macro'
import { styled } from '../../stitches.config'
import { SITE_NAME, SITE_DESCRIPTION } from '../../lib/constants'

const IntroSection = styled(
    'section',
    tw`flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12`
)

const IntroTitle = styled(
    'h1',
    tw`text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8`
)

const IntroDescription = styled(
    'h4',
    tw`text-center md:text-left text-lg mt-5 md:pl-8`
)

export default function Intro() {
    return (
        <IntroSection>
            <IntroTitle>{SITE_NAME}.</IntroTitle>
            <IntroDescription>{SITE_DESCRIPTION}.</IntroDescription>
        </IntroSection>
    )
}
