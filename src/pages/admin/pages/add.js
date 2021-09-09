import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import getPages, { addPage } from "../../../lib/pages";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import Input from "../../../components/forms/input";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import Loader from "../../../components/loader";

function Add() {
  const editorRef = useRef(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({
    name: false,
    slug: false,
  });
  const [parent, setParent] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    name: "",
    slug: "",
    content: "",
    parent: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
  });

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getPages();
      if (response?.status) {
        setIsLoading(false);
        setParent(response.data);
      } else if (response?.error) {
        dispatch({
          type: "SET_CONFIG_KEY",
          key: "notification",
          value: {
            content: response.error,
            outerClassNames: "bg-red-400",
            innerClassNames: "",
            icon: <FiAlertCircle className="mr-2" />,
            animation: "",
            visible: true,
          },
        });
        setIsLoading(false);
        document.querySelector(".main").scrollIntoView();
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    page.content = editorRef.current?.getContent();
    const iserror = Object.keys(validationError).filter(
      (index) => validationError[index] !== false
    );
    if (!iserror?.length) {
      submitData(page);
    } else {
      dispatch({
        type: "SET_CONFIG_KEY",
        key: "notification",
        value: {
          content: "Please enter page details to add a page!",
          outerClassNames: "bg-red-400",
          innerClassNames: "",
          icon: <FiAlertCircle className="mr-2" />,
          animation: "",
          visible: true,
        },
      });
      document.querySelector(".main").scrollIntoView();
    }
  };

  const submitData = async (page) => {
    const response = await addPage(page);
    if (response?.status) {
      setIsAdded(true);
      setIsLoading(false);
      setValidationError({ name: false, slug: false });
      document.querySelector(".main").scrollIntoView();
      setPage({
        name: "",
        slug: "",
        content: "",
        parent: "",
        meta_title: "",
        meta_keywords: "",
        meta_description: "",
      });
      document.forms?.page?.reset();
    } else if (response?.error) {
      setIsAdded(false);
      setValidationError(response.error);
      document.querySelector(".main").scrollIntoView();
      setIsLoading(false);
    }
  };

  const generateSlug = (e) => {
    const slug =
      process.env.BASE_URL +
      "/" +
      page.name
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");

    setPage({ ...page, slug });
    setValidationError({ ...validationError, slug: false });
  };

  const AllPage = () => {
    return (
      <Link href="/admin/pages">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Pages
        </a>
      </Link>
    );
  };

  const parentOptions =
    parent &&
    parent.map((page) => {
      return { label: page.name, value: page.id };
    });

  return (
    <>
      <Head>
        <title>Add Page | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="Pages" subtitle="Add New" right={<AllPage />} />
      {validationError && (
        <div className="errors">
          {Object.keys(validationError).map((index, i) => {
            return (
              validationError[index]?.length && (
                <div className="w-full mb-2" key={i}>
                  <Alert
                    icon={<FiAlertCircle className="mr-2" />}
                    color="bg-white dark:bg-gray-800 border-red-500 text-red-500"
                    borderLeft
                    raised
                  >
                    {validationError[index]}
                  </Alert>
                </div>
              )
            );
          })}
        </div>
      )}
      {isAdded && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            New Page added successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="page">
          <Input
            label="Page Name"
            type="text"
            name="name"
            error={validationError}
            errsetter={setValidationError}
            v={page}
            vsetter={setPage}
            required
            onBlur={(e) => generateSlug(e)}
          />

          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <Input
              label="Page Slug"
              sublabel="auto generated"
              type="text"
              name="slug"
              error={validationError}
              errsetter={setValidationError}
              v={page}
              vsetter={setPage}
              required
            />
            <Input
              label="Parent"
              type="select"
              name="parent"
              error={validationError}
              errsetter={setValidationError}
              v={page}
              vsetter={setPage}
              options={parentOptions}
            />
          </div>
          <div className="form-element">
            <div className="form-label">Page Content</div>
            <Editor
              onInit={(e, editor) => (editorRef.current = editor)}
              init={{
                height: 300,
                menubar: false,
              }}
              apiKey={process.env.TINY_API_KEY}
            />
          </div>
          <Input
            label="Meta Title"
            type="text"
            name="meta_title"
            error={validationError}
            errsetter={setValidationError}
            v={page}
            vsetter={setPage}
          />
          <Input
            label="Meta Keywords"
            type="text"
            name="meta_keywords"
            error={validationError}
            errsetter={setValidationError}
            v={page}
            vsetter={setPage}
          />
          <Input
            label="Meta Description"
            type="textarea"
            name="meta_description"
            error={validationError}
            errsetter={setValidationError}
            v={page}
            vsetter={setPage}
          />
          <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
