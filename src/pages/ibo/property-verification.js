import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import PropertyVerificationUI from "../../components/website/ui/ibo/PropertyVerificationUI";

function PropertyVerification() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Property Verification</title>
      </Head>
      <div>
        <UIRenderer
          UI={PropertyVerificationUI}
          role="Ibo"
          page="Property Verification"
        />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default PropertyVerification;
