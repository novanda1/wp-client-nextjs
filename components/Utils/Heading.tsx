import tw from "twin.macro";
import { styled } from "../../stitches.config";

const tww = tw;

const HeadingSt = styled("h1", {});

const Box: React.FC<{ css?: string; tw?: string; as?: any }> = ({
  children,
  css,
  tw,
  as,
}) => {
  return (
    <HeadingSt css={{ css, ...tww`${tw}` }} as={as}>
      {children}
    </HeadingSt>
  );
};

export default Box;
