import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import PropertiesUI from "../../components/website/ui/landlord/PropertiesUI";

function Properties() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Properties</title>
      </Head>
      <div>
        <UIRenderer UI={PropertiesUI} role="Landlord" page="Properties" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Properties;
