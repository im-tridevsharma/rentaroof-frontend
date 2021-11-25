import React from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import EditTemplateUI from "../../components/website/ui/ibo/EditTemplateUI";

function EditTemplate() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  return isAuthenticated ? (
    <>
      <Head>
        <title>Edit Template</title>
      </Head>
      <div>
        <UIRenderer UI={EditTemplateUI} role="Ibo" page="Edit Template" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" />
  );
}

export default EditTemplate;
