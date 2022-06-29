import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import WalletUI from "../../components/website/ui/user/WalletUI";

function Wallet() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Wallet</title>
      </Head>
      <div>
        <UIRenderer UI={WalletUI} role="User" page="Wallet" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Wallet;
