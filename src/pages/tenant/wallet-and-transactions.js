import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import PaymentUI from "../../components/website/ui/user/PaymentUI";

function Wallet() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Wallet & Transactions</title>
      </Head>
      <div>
        <UIRenderer UI={PaymentUI} role="User" page="Wallet & Transactions" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Wallet;
