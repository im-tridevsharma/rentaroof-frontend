import React, { useEffect, useState } from "react";
import Head from "next/head";
import SectionTitle from "../../../components/section-title";
import Loader from "../../../components/loader";
import getUser from "../../../lib/authentication";
import { useDispatch } from "react-redux";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import FileUpload from "../../../components/forms/file-upload";
import Input from "../../../components/forms/input";
import Datepicker from "../../../components/datepicker";
import Alert from "../../../components/alerts";
import updateProfile, { updatePassword } from "../../../lib/profile";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [errors, setErrors] = useState({
    first: false,
    last: false,
    email: false,
    mobile: false,
    dob: false,
    gender: false,
  });
  const [perrors, setPErrors] = useState({
    current_password: false,
    new_password: false,
    confirm_password: false,
  });
  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
    _method: "PUT",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getUser(true);
      if (response?.status) {
        setProfile(response.user);
        setIsLoading(false);
      } else {
        dispatch({
          type: "SET_CONFIG_KEY",
          key: "notification",
          value: {
            content:
              response?.message ||
              response?.exception ||
              "Something went wrong!",
            outerClassNames: "bg-red-400",
            innerClassNames: "",
            icon: <FiAlertCircle className="mr-2" />,
            animation: "",
            visible: true,
          },
        });
        document.querySelector("#portal").scrollIntoView();
      }
    })();
  }, []);

  const handleProfileSumit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const iserror = Object.keys(errors).filter(
      (index) => errors[index] !== false
    );
    if (!iserror?.length) {
      const formdata = new FormData(document.forms.profile);
      submitData(profile?.id, formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (id, data) => {
    if (id && data) {
      const response = await updateProfile(id, data);
      if (response?.status) {
        setIsUpdated(true);
        setIsLoading(false);
        setErrors({
          first: false,
          last: false,
          email: false,
          mobile: false,
          dob: false,
          gender: false,
        });
        dispatch({
          type: "SET_CONFIG_KEY",
          key: "user",
          value: {
            name: `${response.data?.first} ${response.data?.last}`,
            email: response.data?.email,
            role: response.data?.role,
            permissions: [],
            profile_pic: response.data?.profile_pic,
          },
        });
        document.querySelector(".main").scrollIntoView();
      } else if (response?.error) {
        setErrors(response.error);
        setIsUpdated(false);
        setIsLoading(false);
        document.querySelector(".main").scrollIntoView();
      }
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const iserror = Object.keys(perrors).filter(
      (index) => perrors[index] !== false
    );
    if (!iserror?.length) {
      submitPasswordData(profile?.id, password);
    } else {
      setIsLoading(false);
    }
  };

  const submitPasswordData = async (id, data) => {
    if (id && data) {
      const response = await updatePassword(id, data);
      if (response?.status) {
        setPasswordUpdated(true);
        setIsLoading(false);
        setPErrors({
          current_password: false,
          new_password: false,
          confirm_password: false,
        });
        setPassword({
          current_password: "",
          new_password: "",
          confirm_password: "",
          _method: "PUT",
        });
      } else if (response?.error) {
        setPasswordUpdated(false);
        setIsLoading(false);
        setPErrors(response.error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Profile | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="Profile" subtitle="Manage Profile" />
      {profile && (
        <form
          name="profile"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleProfileSumit}
        >
          <input type="hidden" name="_method" value="PUT" />
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <FileUpload
              name="profile_pic"
              size="big"
              value={profile?.profile_pic}
            />
            <div className="flex w-full flex-col mx-3 my-3 py-3 bg-white dark:bg-gray-800 px-2 rounded-lg border-gray-100 dark:border-gray-900 border-2">
              {errors && (
                <div className="errors">
                  {Object.keys(errors).map((index, i) => {
                    return (
                      errors[index]?.length && (
                        <div className="w-full mb-2" key={i}>
                          <Alert
                            icon={<FiAlertCircle className="mr-2" />}
                            color="bg-white dark:bg-gray-800 border-red-500 text-red-500"
                            borderLeft
                            raised
                          >
                            {errors[index]}
                          </Alert>
                        </div>
                      )
                    );
                  })}
                </div>
              )}
              {isUpdated && (
                <div className="w-full mb-4">
                  <Alert
                    icon={<FiCheck className="mr-2" />}
                    color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
                    borderLeft
                    raised
                  >
                    Profile updated successfully.
                  </Alert>
                </div>
              )}
              <div className="grid sm:grid-cols-2 sm:space-x-3 ">
                <Input
                  label="First Name"
                  name="first"
                  type="text"
                  error={errors}
                  errsetter={setErrors}
                  v={profile}
                  vsetter={setProfile}
                  required
                />
                <Input
                  label="Last Name"
                  name="last"
                  type="text"
                  error={errors}
                  errsetter={setErrors}
                  v={profile}
                  vsetter={setProfile}
                />
              </div>
              <div className="grid sm:grid-cols-2 sm:space-x-3">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  error={errors}
                  errsetter={setErrors}
                  v={profile}
                  vsetter={setProfile}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  error={errors}
                  errsetter={setErrors}
                  v={profile}
                  vsetter={setProfile}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 sm:space-x-3">
                <Input
                  label="Mobile"
                  name="mobile"
                  type="text"
                  error={errors}
                  errsetter={setErrors}
                  v={profile}
                  vsetter={setProfile}
                  required
                />
                <Input
                  label="Gender"
                  name="gender"
                  type="select"
                  error={errors}
                  errsetter={setErrors}
                  v={profile}
                  vsetter={setProfile}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 sm:space-x-3">
                <div className="form-element">
                  <div className="form-label">DOB</div>
                  <Datepicker name="dob" value={profile?.dob} />
                </div>
                <div className="form-element">
                  <button className="mt-7 btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      <hr />
      <h3 className="my-3 text-xl mx-3">Password</h3>
      <div className="flex w-full flex-col mx-3 my-3 py-3 bg-white dark:bg-gray-800 px-2 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {perrors && (
          <div className="errors">
            {Object.keys(perrors).map((index, i) => {
              return (
                perrors[index]?.length && (
                  <div className="w-full mb-2" key={i}>
                    <Alert
                      icon={<FiAlertCircle className="mr-2" />}
                      color="bg-white dark:bg-gray-800 border-red-500 text-red-500"
                      borderLeft
                      raised
                    >
                      {perrors[index]}
                    </Alert>
                  </div>
                )
              );
            })}
          </div>
        )}
        {passwordUpdated && (
          <div className="w-full mb-4">
            <Alert
              icon={<FiCheck className="mr-2" />}
              color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
              borderLeft
              raised
            >
              Password updated successfully.
            </Alert>
          </div>
        )}
        <form name="password" method="POST" onSubmit={handlePasswordSubmit}>
          <div className="grid sm:grid-cols-3 sm:space-x-2">
            <Input
              label="Current Password"
              name="current_password"
              type="password"
              error={perrors}
              errsetter={setPErrors}
              v={password}
              vsetter={setPassword}
              required
            />
            <Input
              label="New Password"
              name="new_password"
              type="password"
              error={perrors}
              errsetter={setPErrors}
              v={password}
              vsetter={setPassword}
              required
            />
            <Input
              label="Confirm Password"
              name="confirm_password"
              type="password"
              error={perrors}
              errsetter={setPErrors}
              v={password}
              vsetter={setPassword}
              required
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

export default Index;
