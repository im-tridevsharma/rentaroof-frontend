import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import SettingUI from "../../components/website/ui/landlord/SettingUI";

function Settings() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div>
        <UIRenderer UI={SettingUI} role="Landlord" page="Settings" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Settings;
