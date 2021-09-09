import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Alert from "../../../../components/alerts";
import SectionTitle from "../../../../components/section-title";
import { getAmenityById, updateAmenity } from "../../../../lib/amenities";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import FileUpload from "../../../../components/forms/file-upload";
import Loader from "../../../../components/loader";
import { useDispatch } from "react-redux";

function Update() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [amenity, setAmenity] = useState({});
  const [verror, setVErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    icon: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  useState(() => {
    setIsLoading(true);
    (async () => {
      const response = await getAmenityById(router.query?.id);
      if (response?.status) {
        setAmenity(response.data);
        setIsLoading(false);
      } else if (response?.error) {
        dispatch({
          type: "SET_CONFIG_KEY",
          key: "notification",
          value: {
            content: response?.error,
            outerClassNames: "bg-red-400",
            innerClassNames: "",
            icon: <FiAlertCircle className="mr-2" />,
            animation: "",
            visible: true,
          },
        });
        document.querySelector(".main").scrollIntoView();
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (document.forms.amenity.title.value === "") {
      setErrors({ ...errors, title: true });
      setIsLoading(false);
      return;
    } else if (!document.forms.amenity.icon.files[0] && !amenity.icon) {
      setErrors({ ...errors, icon: true });
      setIsLoading(false);
      return;
    } else {
      setErrors({ ...errors, icon: false });
      const formdata = new FormData(document.forms.amenity);
      submitData(formdata);
    }
  };

  const submitData = async (data) => {
    const response = await updateAmenity(amenity?.id, data);
    if (response?.status) {
      setIsUpdated(true);
      setVErrors(false);
      setIsLoading(false);
      document.forms.amenity.reset();
      document.querySelector(".main").scrollIntoView();
    } else if (response?.error) {
      setVErrors(response.error);
      setIsUpdated(false);
      setIsLoading(false);
      document.querySelector(".main").scrollIntoView();
    }
  };

  const AllAmenity = () => {
    return (
      <Link href="/admin/properties/amenities">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Amenities
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Add Amenity | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Amenities"
        subtitle="Add New"
        right={<AllAmenity />}
      />
      {verror && (
        <div className="errors">
          {Object.keys(verror).map((index, i) => (
            <div className="w-full mb-2" key={i}>
              <Alert
                icon={<FiAlertCircle className="mr-2" />}
                color="bg-white border-red-500 text-red-500"
                borderLeft
                raised
              >
                {verror[index]}
              </Alert>
            </div>
          ))}
        </div>
      )}
      {isUpdated && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white border-green-500 text-green-500"
            borderLeft
            raised
          >
            Amenity updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="amenity">
          <input type="hidden" name="_method" value="PUT" />
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">
                Title<span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="title"
                required
                className={`form-input ${
                  errors?.title ? "border-red-400 border-2" : ""
                }`}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setErrors({ ...errors, title: false })
                    : setErrors({ ...errors, title: true });
                  setAmenity({ ...amenity, title: e.target.value });
                }}
                value={amenity?.title ? amenity.title : ""}
              />
            </div>
            <div className="form-element">
              <div className="form-label text-center">
                Icon<span className="text-red-500">*</span>
              </div>
              <FileUpload
                name="icon"
                size="small"
                value={amenity?.icon ? amenity.icon : ""}
                error={errors?.icon}
              />
            </div>
          </div>
          <div className="form-element">
            <div className="form-label">Description</div>
            <textarea
              name="description"
              className="form-input"
              value={amenity?.description ? amenity.description : ""}
              onChange={(e) =>
                setAmenity({ ...amenity, description: e.target.value })
              }
            ></textarea>
          </div>
          <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Update;
