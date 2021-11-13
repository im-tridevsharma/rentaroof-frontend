import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import PaymentUI from "../../components/website/ui/landlord/PaymentUI";

function Payment() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <div>
        <UIRenderer UI={PaymentUI} role="Landlord" page="Payment" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Payment;
