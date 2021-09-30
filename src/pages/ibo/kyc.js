import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import KycUI from "../../components/website/ui/ibo/KycUI";

function Kyc() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Kyc</title>
      </Head>
      <div>
        <UIRenderer UI={KycUI} role="Ibo" page="Kyc" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Kyc;
