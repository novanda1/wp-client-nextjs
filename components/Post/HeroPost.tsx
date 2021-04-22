import tw from "twin.macro";
import { css } from "../../stitches.config";

import Link from "next/link";
import { Avatar, Date, CoverImage, Heading, Box } from "..";

const HeroPostExcerp = css({
  ...tw`text-lg leading-relaxed mb-4`,

  p: {
    ...tw`line-clamp-4`,
  },
});

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <Box tw="mb-8 md:mb-16">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
      </Box>
      <Box tw="md:grid md:grid-cols-2 md:gap-16 lg:gap-8 mb-20 md:mb-28">
        <div>
          <Heading as="h3" tw="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a
                tw="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Link>
          </Heading>
          <div tw="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <div
            className={HeroPostExcerp()}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <Avatar author={author} />
        </div>
      </Box>
    </section>
  );
}
