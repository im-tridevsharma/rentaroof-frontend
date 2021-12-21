import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import McqUI from "../../components/website/ui/ibo/McqUI";

function TrainingMcqs() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>MCQs</title>
      </Head>
      <div>
        <UIRenderer UI={McqUI} role="Ibo" page="Mcq" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default TrainingMcqs;
