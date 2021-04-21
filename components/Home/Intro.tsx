import 'twin.macro'
import { SITE_NAME, SITE_DESCRIPTION } from '../../lib/constants'

export default function Intro() {
    return (
        <section tw="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 tw="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                {SITE_NAME}.
            </h1>
            <h4 tw="text-center md:text-left text-lg mt-5 md:pl-8">
                {SITE_DESCRIPTION}.
            </h4>
        </section>
    )
}
