import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import MapUI from "../../components/website/ui/landlord/MapUI";

function Map() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Map</title>
      </Head>
      <div>
        <UIRenderer UI={MapUI} role="Landlord" page="Map" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Map;
