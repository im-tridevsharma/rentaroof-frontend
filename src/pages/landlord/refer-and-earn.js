import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import ReferAndEarnUI from "../../components/website/ui/landlord/ReferAndEarnUI";

function ReferAndEarn() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Refer And Earn</title>
      </Head>
      <div>
        <UIRenderer UI={ReferAndEarnUI} role="Landlord" page="Refer And Earn" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default ReferAndEarn;
