import React from "react";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import Alert from "../../../components/alerts";
import { FiCheck, FiUploadCloud } from "react-icons/fi";
import FileUpload from "../../../components/forms/file-upload";
import { getSetting, saveBulkSetting } from "../../../lib/authentication";

function Index() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [tabMode, setTabMode] = React.useState("general");
  const [generalSettings, setGeneralSettings] = React.useState({});
  const [commisionSettings, setCommisionSettings] = React.useState({});
  const [websiteSettings, setWebsiteSettings] = React.useState({});

  React.useEffect(() => {
    const fetchGeneralSettings = async () => {
      setIsLoading(true);
      const res = await getSetting(
        "logo,company_name,company_email,company_contact,tollfree_number,facebook_url,instagram_url,twitter_url,linkedin_url"
      );
      if (res?.status) {
        setIsLoading(false);
        setGeneralSettings(res.data);
      } else {
        console.error(res?.error || res.message);
        setIsLoading(false);
      }
    };

    const fetchCommisionSettings = async () => {
      setIsLoading(true);
      const res = await getSetting("ibo_commision,landlord_commision");
      if (res?.status) {
        setIsLoading(false);
        setCommisionSettings(res.data);
      } else {
        console.error(res?.error || res.message);
        setIsLoading(false);
      }
    };

    const fetchWebsiteSettings = async () => {
      setIsLoading(true);
      const res = await getSetting("homepage_search_title");
      if (res?.status) {
        setIsLoading(false);
        setWebsiteSettings(res.data);
      } else {
        console.error(res?.error || res.message);
        setIsLoading(false);
      }
    };

    fetchGeneralSettings();
    fetchCommisionSettings();
    fetchWebsiteSettings();
  }, []);

  const handleGeneralForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.general);
    const response = await saveBulkSetting(formdata);
    if (response?.status) {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } else {
      console.error(response?.error || response?.message);
      setIsLoading(false);
    }
  };

  const handleCommisionForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.commision);
    const response = await saveBulkSetting(formdata);
    if (response?.status) {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } else {
      console.error(response?.error || response?.message);
      setIsLoading(false);
    }
  };

  const handleWebsiteForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.website);
    const response = await saveBulkSetting(formdata);
    if (response?.status) {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } else {
      console.error(response?.error || response?.message);
      setIsLoading(false);
    }
  };

  const changeGHandler = (e) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({ ...prev, [name]: value }));
  };

  const changeCHandler = (e) => {
    const { name, value } = e.target;
    setCommisionSettings((prev) => ({ ...prev, [name]: value }));
  };

  const changeWHandler = (e) => {
    const { name, value } = e.target;
    setWebsiteSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {isLoading && <Loader />}
      <SectionTitle title="Settings" subtitle="Manage Settings" />
      {isSaved && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-5" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            Settings saved successfully.
          </Alert>
        </div>
      )}

      {/**settings tab */}
      <div className="flex items-center">
        <button
          className={`mr-5 border-b-2 transition-all duration-400 ease-linear ${
            tabMode === "general" ? "border-blue-600 " : "border-transparent"
          }`}
          onClick={() => setTabMode("general")}
        >
          General
        </button>
        <button
          className={`mr-5 border-b-2 transition-all duration-400 ease-linear ${
            tabMode === "commision" ? "border-blue-600" : "border-transparent"
          }`}
          onClick={() => setTabMode("commision")}
        >
          Commision
        </button>
        <button
          className={`mr-5 border-b-2 transition-all duration-400 ease-linear ${
            tabMode === "website" ? "border-blue-600" : "border-transparent"
          }`}
          onClick={() => setTabMode("website")}
        >
          Website
        </button>
      </div>
      {/**tabs content */}
      <div className="p-3 mt-5 border border-gray-200 dark:bg-gray-700 dark:border-gray-800 bg-white rounded-md flex flex-col">
        {tabMode === "general" && (
          <div>
            <h5>General Settings</h5>
            <form name="general" onSubmit={handleGeneralForm} className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
                <div className="form-element relative">
                  <label className="form-label">Logo</label>
                  <FileUpload
                    size="big"
                    align="left"
                    name="logo"
                    value={generalSettings?.logo}
                  />
                  <FiUploadCloud className="absolute bottom-2 left-16" />
                </div>
                <div>
                  <div className="form-element">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      value={generalSettings?.company_name}
                      onChange={changeGHandler}
                      className="form-input"
                    />
                  </div>
                  <div className="form-element">
                    <label className="form-label">Company Email</label>
                    <input
                      type="email"
                      name="company_email"
                      className="form-input"
                      value={generalSettings?.company_email}
                      onChange={changeGHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
                <div className="form-element">
                  <label className="form-label">Company Contact</label>
                  <input
                    type="text"
                    name="company_contact"
                    className="form-input"
                    value={generalSettings?.company_contact}
                    onChange={changeGHandler}
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Toll Free Number</label>
                  <input
                    type="text"
                    name="tollfree_number"
                    className="form-input"
                    value={generalSettings?.tollfree_number}
                    onChange={changeGHandler}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
                <div className="form-element">
                  <label className="form-label">Facebook Url</label>
                  <input
                    type="text"
                    name="facebook_url"
                    className="form-input"
                    value={generalSettings?.facebook_url}
                    onChange={changeGHandler}
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Instagram Url</label>
                  <input
                    type="text"
                    name="instagram_url"
                    className="form-input"
                    value={generalSettings?.instagram_url}
                    onChange={changeGHandler}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
                <div className="form-element">
                  <label className="form-label">Twitter Url</label>
                  <input
                    type="text"
                    name="twitter_url"
                    className="form-input"
                    value={generalSettings?.twitter_url}
                    onChange={changeGHandler}
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">LinkedIn Url</label>
                  <input
                    type="text"
                    name="linkedin_url"
                    className="form-input"
                    value={generalSettings?.linkedin_url}
                    onChange={changeGHandler}
                  />
                </div>
              </div>
              <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
                Submit
              </button>
            </form>
          </div>
        )}
        {tabMode === "commision" && (
          <div>
            <h5>Commision Settings</h5>
            <form
              name="commision"
              onSubmit={handleCommisionForm}
              className="mt-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
                <div className="form-element">
                  <label className="form-label">
                    IBO Commision (in percentage)
                  </label>
                  <input
                    type="text"
                    name="ibo_commision"
                    className="form-input"
                    value={commisionSettings?.ibo_commision}
                    onChange={changeCHandler}
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">
                    Landlord Commision (in percentage)
                  </label>
                  <input
                    type="text"
                    name="landlord_commision"
                    className="form-input"
                    value={commisionSettings?.landlord_commision}
                    onChange={changeCHandler}
                  />
                </div>
              </div>
              <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
                Submit
              </button>
            </form>
          </div>
        )}
        {tabMode === "website" && (
          <div>
            <h5>Website Settings</h5>
            <form name="website" onSubmit={handleWebsiteForm} className="mt-2">
              <div className="form-element">
                <label className="form-label">Homepage Search Title</label>
                <input
                  type="text"
                  name="homepage_search_title"
                  className="form-input"
                  value={websiteSettings?.homepage_search_title}
                  onChange={changeWHandler}
                />
              </div>
              <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
