import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import ProfileUI from "../../components/website/ui/landlord/ProfileUI";

function Profile() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        <UIRenderer UI={ProfileUI} role="Landlord" page="Profile" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Profile;
