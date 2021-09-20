import React from "react";
import Head from "next/head";

function RenderError({ error }) {
  return (
    <>
      <Head>
        <title>{error || "Unauthenticated"}</title>
      </Head>
      <div>
        <code>{error || "Unauthenticated!"}</code>
      </div>
    </>
  );
}

export default RenderError;
