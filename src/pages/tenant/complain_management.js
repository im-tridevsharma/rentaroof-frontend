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
        <title>Complain Management</title>
      </Head>
      <div>
        <UIRenderer UI={ComplainManagementUI} role="User" page="Complain" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default ComplainManagement;
