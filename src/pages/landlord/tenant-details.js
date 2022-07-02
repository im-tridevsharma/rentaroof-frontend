import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import TenantUI from "../../components/website/ui/landlord/TenantUI";

function Tenant() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Tenant</title>
      </Head>
      <div>
        <UIRenderer UI={TenantUI} role="Landlord" page="Tenant" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Tenant;
