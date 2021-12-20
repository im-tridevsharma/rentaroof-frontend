import { useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { addFaq } from "../../../lib/faqs";
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
    title: false,
    type: false,
  });
  const dispatch = useDispatch();
  const [faq, setFaq] = useState({
    title: "",
    type: "",
    faq: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    faq.faq = editorRef.current?.getContent();
    const iserror = Object.keys(validationError).filter(
      (index) => validationError[index] !== false
    );
    if (!iserror?.length) {
      submitData(faq);
    } else {
      dispatch({
        type: "SET_CONFIG_KEY",
        key: "notification",
        value: {
          content: "Please enter faq details to add a faq!",
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

  const submitData = async (faq) => {
    const response = await addFaq(faq);
    if (response?.status) {
      setIsAdded(true);
      setIsLoading(false);
      setValidationError({ title: false, type: false });
      document.querySelector(".main").scrollIntoView();
      setFaq({
        title: "",
        type: "",
        faq: "",
      });
      document.forms?.faq?.reset();
    } else if (response?.error) {
      setIsAdded(false);
      setValidationError(response.error);
      document.querySelector(".main").scrollIntoView();
      setIsLoading(false);
    }
  };

  const AllFaq = () => {
    return (
      <Link href="/admin/faqs">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Faqs
        </a>
      </Link>
    );
  };

  const parentOptions = [
    { label: "Tenant", value: "tenant" },
    { label: "IBO", value: "ibo" },
    { label: "Landlord", value: "landlord" },
  ];

  return (
    <>
      <Head>
        <title>Add Faq | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="Faqs" subtitle="Add New" right={<AllFaq />} />
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
            New Faq added successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="faq">
          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <Input
              label="Title"
              type="text"
              name="title"
              error={validationError}
              errsetter={setValidationError}
              v={faq}
              vsetter={setFaq}
              required
            />
            <Input
              label="User Type"
              type="select"
              name="type"
              error={validationError}
              errsetter={setValidationError}
              v={faq}
              vsetter={setFaq}
              options={parentOptions}
              required
            />
          </div>
          <div className="form-element">
            <div className="form-label">Faq Content</div>
            <Editor
              onInit={(e, editor) => (editorRef.current = editor)}
              init={{
                height: 300,
                menubar: false,
              }}
              apiKey={process.env.TINY_API_KEY}
            />
          </div>
          <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
