import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import Alert from "../../../components/alerts";
import Input from "../../../components/forms/input";
import Dropzone from "react-dropzone";
import { addTraining, searchUsers } from "../../../lib/trainings";

function Add() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    type: false,
    user: false,
  });
  const [training, setTraining] = useState({
    title: "",
    description: "",
    type: "",
    user: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.training);
    pdfFiles.forEach((file) => {
      formdata.append("pdfs[]", file);
    });
    videoFiles.forEach((file) => {
      formdata.append("videos[]", file);
    });

    const iserror = Object.keys(errors).filter(
      (index) => errors[index] !== false
    );
    if (!iserror?.length) {
      submitData(formdata);
    }
  };

  const submitData = async (data) => {
    const response = await addTraining(data);
    if (response?.status) {
      setIsAdded(true);
      setErrors({ title: false, description: false, type: false });
      setIsLoading(false);
      setTraining({ title: "", description: "", type: "" });
      setPdfFiles([]);
      setVideoFiles([]);
      document.querySelector(".main").scrollIntoView();
    } else {
      setIsLoading(false);
      console.log(response);
    }
  };

  //all training button
  const AllTraining = () => {
    return (
      <Link href="/admin/trainings">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Trainings
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Add Training | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Trainings"
        subtitle="Add New"
        right={<AllTraining />}
      />
      {errors && (
        <div className="errors">
          {Object.keys(errors).map((index, i) => {
            return (
              errors[index]?.length && (
                <div className="w-full mb-2" key={i}>
                  <Alert
                    icon={<FiAlertCircle className="mr-2" />}
                    color="bg-white border-red-500 text-red-500"
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
      {isAdded && (
        <div className="w-full mb-4 success">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white border-green-500 text-green-500"
            borderLeft
            raised
          >
            New Training added successfully.
          </Alert>
        </div>
      )}

      {/**form to add new training */}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form
          method="POST"
          onSubmit={handleSubmit}
          name="training"
          encType="multipart/form-data"
        >
          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <Input
              label="Title"
              name="title"
              type="text"
              error={errors}
              errsetter={setErrors}
              v={training}
              vsetter={setTraining}
              required
            />
            <Input
              label="User Type"
              name="type"
              type="select"
              error={errors}
              errsetter={setErrors}
              v={training}
              vsetter={setTraining}
              required
              options={[
                { label: "Tenant", value: "tenant" },
                { label: "IBO", value: "ibo" },
                { label: "Landlord", value: "landlord" },
              ]}
            />
          </div>
          <Input
            label="Description"
            name="description"
            type="textarea"
            error={errors}
            errsetter={setErrors}
            v={training}
            vsetter={setTraining}
            required
          />
          <div className="form-element">
            <div className="form-label">Pdf Attachments</div>
            <Dropzone
              accept="application/pdf"
              onDrop={(acceptedFiles) => setPdfFiles(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="p-5 bg-gray-200 dark:bg-gray-700 dark:border-gray-400 rounded-md border-dashed border-2 cursor-pointer border-white">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop pdf files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            {pdfFiles?.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xl">Selected Pdf Files</h4>
                <ul>
                  {pdfFiles.map((file, i) => (
                    <li
                      key={i}
                      className="px-1 bg-gray-100 dark:bg-gray-700 inline-block m-1 rounded-full"
                    >{`${file.name} - ${parseFloat(file.size / 1000000).toFixed(
                      2
                    )} mb`}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="form-element">
            <div className="form-label">Video Uploads</div>
            <Dropzone
              accept="video/*"
              onDrop={(acceptedFiles) => setVideoFiles(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="p-5 bg-gray-200 dark:bg-gray-700 dark:border-gray-400 rounded-md border-dashed border-2 cursor-pointer border-white">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop video files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            {videoFiles?.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xl">Selected Video Files</h4>
                <ul>
                  {videoFiles.map((file, i) => (
                    <li
                      key={i}
                      className="px-1 bg-gray-100 dark:bg-gray-700 inline-block m-1 rounded-full"
                    >{`${file.name} - ${parseFloat(file.size / 1000000).toFixed(
                      2
                    )} mb`}</li>
                  ))}
                </ul>
              </div>
            )}
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
