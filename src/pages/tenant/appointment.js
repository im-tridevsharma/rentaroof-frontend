import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import AppointmentUI from "../../components/website/ui/user/AppointmentUI";

function Appointment() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Appointment</title>
      </Head>
      <div>
        <UIRenderer UI={AppointmentUI} role="User" page="Appointment" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Appointment;
