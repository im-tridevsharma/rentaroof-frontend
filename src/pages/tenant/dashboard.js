import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";

function Dashboard() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  const DashboardUI = () => {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  };

  return isAuthenticated ? (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <UIRenderer UI={DashboardUI} role="User" page="Dashboard" />
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Dashboard;
