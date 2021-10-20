import React, { useEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import SectionTitle from "../../../components/section-title";
import Loader from "../../../components/loader";
import Alert from "../../../components/alerts";
import { Editor } from "@tinymce/tinymce-react";
import { getSetting, saveOrUpdateSetting } from "../../../lib/authentication";

function CreateTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [template, setTemplate] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getSetting("agreement_template");
      if (response?.status) {
        setIsLoading(false);
        setTemplate(
          response?.data.setting_value || response?.data.agreement_template
        );
      } else {
        setIsLoading(false);
        console.error(response?.error || response?.message);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const template = editorRef.current.getContent();
    const response = await saveOrUpdateSetting({
      setting_key: "agreement_template",
      setting_value: template,
    });
    if (response?.status) {
      setIsAdded(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } else {
      setIsLoading(false);
      console.error(response?.error || response?.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <SectionTitle title="Agreement Template" subtitle="Manage Template" />
      {isAdded && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            Template saved successfully.
          </Alert>
        </div>
      )}
      <div className="px-2 py-1 bg-white rounded-md">
        <b className="mb-1 block">Variables to use</b>
        <div className="flex items-center flex-wrap">
          <code className="text-red-500 m-1">[[FIRST_NAME]]</code>
          <code className="text-red-500 m-1">[[LAST_NAME]]</code>
          <code className="text-red-500 m-1">[[FULL_NAME]]</code>
          <code className="text-red-500 m-1">[[MOBILE]]</code>
          <code className="text-red-500 m-1">[[EMAIL]]</code>
          <code className="text-red-500 m-1">[[LANDLORD_FULL_NAME]]</code>
          <code className="text-red-500 m-1">[[IBO_FULL_NAME]]</code>
        </div>
      </div>

      <form
        name="agreement"
        onSubmit={handleSubmit}
        className="mt-5 bg-white flex flex-col items-end rounded-md p-2"
      >
        <div className="form-element w-full">
          <label className="form-label">Template Content</label>
          <Editor
            onInit={(e, editor) => (editorRef.current = editor)}
            init={{
              height: 300,
              menubar: false,
            }}
            initialValue={template}
            apiKey={process.env.TINY_API_KEY}
          />
        </div>

        <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateTemplate;
