import Header from "../components/website/Header";
import Footer from "../components/website/Footer";
import router from "next/router";
import Head from "next/head";

function PageRender({ page }) {
  if (!page?.data) {
    router.replace("/404");
  }

  return (
    <>
      <Header />
      <Head>
        <title>{page?.data.name}</title>
        <meta name="title" content={page?.data.meta_title} />
        <meta name="keywords" content={page?.data.meta_keywords} />
        <meta name="description" content={page?.data.meta_description} />
      </Head>
      {/**page content goes here */}
      <div className="w-full px-2 py-5">
        <div
          className="max-w-5xl mx-auto"
          dangerouslySetInnerHTML={{ __html: page?.data.content }}
        />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = process.env.BASE_URL + "/" + context.params.slug;
  const res = await fetch(
    process.env.BASE_URL.replace("3000", "8000") + "/api/page?slug=" + slug
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page: data }, // will be passed to the page component as props
  };
}

export default PageRender;
