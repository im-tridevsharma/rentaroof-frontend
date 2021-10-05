import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import EarningUI from "../../components/website/ui/landlord/EarningUI";

function Earning() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Earning</title>
      </Head>
      <div>
        <UIRenderer UI={EarningUI} role="Landlord" page="Earning" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Earning;
