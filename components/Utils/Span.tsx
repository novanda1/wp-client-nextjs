import React from "react";
import { TwStyle } from "twin.macro";
import { styled } from "../../stitches.config";

const SpanSt = styled("span", {});

const Span: React.FC<{
  css?: any;
  element?: keyof JSX.IntrinsicElements;
  tws: TwStyle;
}> = ({ children, css, element, tws }) => {
  return (
    <SpanSt as={element} css={{ css, ...tws }}>
      {children}
    </SpanSt>
  );
};

export default Span;
