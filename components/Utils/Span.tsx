import { styled } from "../../stitches.config";

const SpanSt = styled("span", {});

const Span = ({ children, css }) => {
  return <SpanSt css={css}>{children}</SpanSt>;
};

export default Span;
