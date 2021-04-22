import { styled } from "../../stitches.config";

const HeadingSt = styled("h1", {});

const Box: React.FC<{ css?: string; tw?: object; as?: any }> = ({
  children,
  css,
  tw,
  as,
}) => {
  return (
    <HeadingSt css={{ css, ...tw }} as={as}>
      {children}
    </HeadingSt>
  );
};

export default Box;
