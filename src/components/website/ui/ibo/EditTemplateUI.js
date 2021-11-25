import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import Loader from "../../../loader";
import { toast, ToastContainer } from "react-toastify";
import { saveOrUpdateSetting } from "../../../../lib/frontend/share";
import server from "../../../../server";

const getWebsiteValues = async (key) => {
  let setting = "";
  await server
    .get("/website/initials/" + key)
    .then((response) => {
      setting = response?.data;
    })
    .catch((error) => {
      setting = error?.response?.data;
    });
  return setting;
};

function EditTemplateUI() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [template, setTemplate] = React.useState("");
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getWebsiteValues("agreement_template");
      if (response?.status) {
        setIsLoading(false);
        setTemplate(response?.data.agreement_template);
      } else {
        setIsLoading(false);
        toast.error(response?.error || response?.message);
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
      toast.success("Template updated successfully.");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(response?.error || response?.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="relative p-5 shadow-sm border-2 border-gray-200 bg-white rounded-md">
        {/**left line */}
        <span
          className="absolute left-0 w-1 top-1 rounded-lg"
          style={{ backgroundColor: "var(--blue)", height: "98%" }}
        ></span>
        <div className="px-2 py-1 bg-white rounded-md">
          <b className="mb-1 block">Variables to use</b>
          <div className="flex items-center flex-wrap leading-3">
            <code className=" m-1">[[TENANT_FIRST_NAME]]</code>
            <code className=" m-1">[[TENANT_LAST_NAME]]</code>
            <code className=" m-1">[[TENANT_FULL_NAME]]</code>
            <code className=" m-1">[[TENANT_MOBILE]]</code>
            <code className=" m-1">[[TENANT_EMAIL]]</code>
            <code className=" m-1">[[TENANT_FULL_ADDRESS]]</code>
            <code className=" m-1">[[TENANT_SIGNATURE]]</code>
            <code className=" m-1">[[LANDLORD_FIRST_NAME]]</code>
            <code className=" m-1">[[LANDLORD_LAST_NAME]]</code>
            <code className=" m-1">[[LANDLORD_FULL_NAME]]</code>
            <code className=" m-1">[[LANDLORD_EMAIL]]</code>
            <code className=" m-1">[[LANDLORD_MOBILE]]</code>
            <code className=" m-1">[[LANDLORD_FULL_ADDRESS]]</code>
            <code className=" m-1">[[LANDLORD_SIGNATURE]]</code>
            <code className=" m-1">[[IBO_FIRST_NAME]]</code>
            <code className=" m-1">[[IBO_LAST_NAME]]</code>
            <code className=" m-1">[[IBO_FULL_NAME]]</code>
            <code className=" m-1">[[IBO_EMAIL]]</code>
            <code className=" m-1">[[IBO_MOBILE]]</code>
            <code className=" m-1">[[IBO_FULL_ADDRESS]]</code>
            <code className=" m-1">[[MONTHLY_RENT]]</code>
            <code className=" m-1">[[MAINTENANCE_CHARGE]]</code>
            <code className=" m-1">[[MAINTENANCE_DURATION]]</code>
            <code className=" m-1">[[SECURITY_DEPOSIT]]</code>
            <code className=" m-1">[[CONTRACT_DURATION]]</code>
            <code className=" m-1">[[START_DATE]]</code>
            <code className=" m-1">[[END_DATE]]</code>
            <code className=" m-1">[[NEXT_DUE]]</code>
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
      </div>
    </>
  );
}

export default EditTemplateUI;
