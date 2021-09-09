import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import SectionTitle from "../../../../components/section-title";
import Alert from "../../../../components/alerts";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import Input from "../../../../components/forms/input";
import Loader from "../../../../components/loader";
import { addRole } from "../../../../lib/roles";
import permissions_data from "../../../../json/permissions_data.json";

function Add() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [errors, setErrors] = useState({ title: false, permissions: false });
  const [role, setRole] = useState({
    title: "",
    description: "",
    permissions: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const iserror = Object.keys(errors).filter(
      (index) => errors[index] !== false
    );
    if (!iserror?.length) {
      submitData(role);
    }
  };

  const submitData = async (data) => {
    const response = await addRole(data);
    if (response?.status) {
      setIsAdded(true);
      setIsLoading(false);
      setRole({ title: "", description: "", permissions: [] });
      setErrors({ title: false, permissions: false });
      document.forms.role?.reset();
      document.querySelector(".main").scrollIntoView();
    } else if (response?.error) {
      setErrors(response.error);
      setIsAdded(false);
      setIsLoading(false);
      document.querySelector(".main").scrollIntoView();
    }
  };

  const permissionHandler = (e) => {
    const value = e.target.value;
    if (!role.permissions.includes(value)) {
      role.permissions.push(value);
    } else {
      role.permissions.splice(role.permissions.indexOf(value), 1);
    }

    if (role.permissions.length) {
      setErrors({ ...errors, permissions: false });
    } else {
      setErrors({ ...errors, permissions: "Provide at least one permission." });
    }
  };

  const AllRole = () => {
    return (
      <Link href="/admin/employees/roles">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Roles
        </a>
      </Link>
    );
  };

  return (
    <>
      <SectionTitle title="Roles" subtitle="Add New" right={<AllRole />} />
      <Head>
        <title>Add Role | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
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
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white border-green-500 text-green-500"
            borderLeft
            raised
          >
            New Role added successfully.
          </Alert>
        </div>
      )}

      <div className="bg-white flex flex-col px-5 py-3 rounded-lg border-gray-100 border-2">
        <form method="POST" onSubmit={handleSubmit} name="role">
          <Input
            label="Title"
            name="title"
            type="text"
            error={errors}
            errsetter={setErrors}
            v={role}
            vsetter={setRole}
            required={true}
          />
          <Input
            label="Description"
            name="description"
            type="textarea"
            error={errors}
            errsetter={setErrors}
            v={role}
            vsetter={setRole}
          />
          <div className="form-element">
            <div className="form-label">Permissions</div>
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {permissions_data &&
                permissions_data.map((p, i) => (
                  <label
                    htmlFor={i}
                    key={i}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className=""
                      name="permissions[]"
                      id={i}
                      value={p.value}
                      onChange={(e) => permissionHandler(e)}
                    />
                    <span className="ml-1">{p.label}</span>
                  </label>
                ))}
            </div>
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
