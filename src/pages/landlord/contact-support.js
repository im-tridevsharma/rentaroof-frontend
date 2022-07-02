import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import ComplainManagementUI from "../../components/website/ui/user/ComplainManagementUI";

function ComplainManagement() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Contact Support</title>
      </Head>
      <div>
        <UIRenderer
          UI={ComplainManagementUI}
          role="Landlord"
          page="Contact Support"
        />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default ComplainManagement;
