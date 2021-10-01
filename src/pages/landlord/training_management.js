import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import TrainingManagementUI from "../../components/website/ui/landlord/TrainingManagementUI";

function TrainingManagement() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Training Management</title>
      </Head>
      <div>
        <UIRenderer UI={TrainingManagementUI} role="Landlord" page="Training" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default TrainingManagement;
