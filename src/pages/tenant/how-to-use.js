import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import HowToUseUI from "../../components/website/ui/user/HowToUseUI";

function HowToUse() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>HowToUse</title>
      </Head>
      <div>
        <UIRenderer UI={HowToUseUI} role="User" page="How To Use" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default HowToUse;
