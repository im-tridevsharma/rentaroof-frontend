import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import ChatUI from "../../components/website/ui/landlord/ChatUI";

function Chat() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <div className="h-screen overflow-x-hidden overflow-y-auto">
        <UIRenderer UI={ChatUI} role="Landlord" page="Chat" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default Chat;
