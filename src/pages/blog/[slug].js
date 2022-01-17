import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";
import server from "../../server";

const getBlog = async (slug) => {
  let blogs = false;
  await server
    .get("/blog?slug=" + slug)
    .then((response) => {
      blogs = response?.data;
    })
    .catch((error) => {
      blogs = error?.response?.data;
    });

  return blogs;
};

function Slug({ slug }) {
  const [blog, setBlog] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const getBlogData = async () => {
      const bdata = await getBlog(process?.env?.BASE_URL + "/blog/" + slug);
      if (bdata?.status) {
        setBlog(bdata?.data);
      } else {
        router?.push("/404");
      }
    };

    getBlogData();

    return () => {
        setBlog(false);
    }
  }, []);

  return (
    <>
      <Header />
      {blog && (
        <>
          <Head>
            <title>{blog?.title}</title>
            <meta name="title" content={blog?.meta_title} />
            <meta name="keywords" content={blog?.meta_keywords} />
            <meta name="description" content={blog?.meta_description} />
          </Head>
          <div className="w-full px-2 py-5">
            <div
              className="max-w-5xl mx-auto"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

Slug.getInitialProps = ({ query }) => {
  return { slug: query.slug };
};

export default Slug;
