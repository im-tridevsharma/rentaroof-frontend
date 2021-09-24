import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import DashboardUI from "../../components/website/ui/landlord/DashboardUI";

function Dashboard() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <UIRenderer UI={DashboardUI} role="Landlord" page="Dashboard" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Dashboard;
