import { TwStyle } from "twin.macro";
import { styled } from "../../stitches.config";

const BoxSt = styled("div", {});

const Box: React.FC<{ css?: string; tws?: TwStyle }> = ({
  children,
  css,
  tws,
}) => {
  return <BoxSt css={{ css, ...tws }}>{children}</BoxSt>;
};

export default Box;
