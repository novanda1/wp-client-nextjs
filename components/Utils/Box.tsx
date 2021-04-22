import { styled } from "../../stitches.config";

const BoxSt = styled("div", {});

const Box: React.FC<{ css?: string; tw?: object }> = ({
  children,
  css,
  tw,
}) => {
  return <BoxSt css={{ css, ...tw }}>{children}</BoxSt>;
};

export default Box;
