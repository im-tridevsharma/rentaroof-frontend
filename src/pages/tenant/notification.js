import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import NotificationUI from "../../components/website/ui/user/NotificationUI";

function Notification() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Notification</title>
      </Head>
      <div>
        <UIRenderer UI={NotificationUI} role="User" page="Notification" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Notification;
