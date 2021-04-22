import tw from "twin.macro";
import { css } from "../../stitches.config";
import Meta from "../Base/Meta";
import { Alert } from "..";
import React from "react";

const MainContainer = css(tw`min-h-screen`);

const Layout: React.FC<{ preview?: boolean }> = ({ preview, children }) => {
  return (
    <>
      <Meta />
      <div className={MainContainer()}>
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
