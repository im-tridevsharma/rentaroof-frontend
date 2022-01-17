import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { addBlog, getBlogById, updateBlog } from "../../../lib/blogs";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import Input from "../../../components/forms/input";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import Loader from "../../../components/loader";
import FileUpload from "../../../components/forms/file-upload";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Edit() {
  const editorRef = useRef(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({
    title: false,
    slug: false,
  });
  const dispatch = useDispatch();
  const [blog, setBlog] = useState();
  const router = useRouter();

  useEffect(() => {
      const fetchBlog = async() => {
        setIsLoading(true);
        const res = await getBlogById(router.query?.id);
        if(res?.status){
            setBlog(res?.data);
            setIsLoading(false)
        }else{
            toast.error(res?.error || res?.message);
            setIsLoading(false);
        }
      }

      fetchBlog();

      return () => {
          setBlog(null);
      }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.blog);
    formdata.append("content", editorRef.current?.getContent());
    formdata.append("_method", "PUT");
    const iserror = Object.keys(validationError).filter(
      (index) => validationError[index] !== false
    );
    if (!iserror?.length) {
      submitData(blog?.id, formdata);
    } else {
      dispatch({
        type: "SET_CONFIG_KEY",
        key: "notification",
        value: {
          content: "Please enter blog details to add a blog!",
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

  const submitData = async (id, blog) => {
    const response = await updateBlog(id, blog);
    if (response?.status) {
      setIsEdited(true);
      setIsLoading(false);
      setValidationError({ name: false, slug: false });
      document.querySelector(".main").scrollIntoView();
      document.forms?.blog?.reset();
    } else if (response?.error) {
      setIsEdited(false);
      setValidationError(response.error);
      document.querySelector(".main").scrollIntoView();
      setIsLoading(false);
    }
  };

  const generateSlug = (e) => {
    const slug =
      process.env.BASE_URL +
      "/blog/" +
      blog.title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");

    setBlog({ ...blog, slug });
    setValidationError({ ...validationError, slug: false });
  };

  const AllBlog = () => {
    return (
      <Link href="/admin/blogs">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Blogs
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Edit Blog | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="Blogs" subtitle="Edit New" right={<AllBlog />} />
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
      {isEdited && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            Blog updated successfully.
          </Alert>
        </div>
      )}
      {blog &&
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="blog" encType="multipart/form-data">
          <Input
            label="Blog Title"
            type="text"
            name="title"
            error={validationError}
            errsetter={setValidationError}
            v={blog}
            vsetter={setBlog}
            required
            onBlur={(e) => generateSlug(e)}
          />

          <Input
            label="Sub Title"
            type="text"
            name="sub_title"
            error={validationError}
            errsetter={setValidationError}
            v={blog}
            vsetter={setBlog}
          />

          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <Input
              label="Blog Slug"
              sublabel="auto generated"
              type="text"
              name="slug"
              error={validationError}
              errsetter={setValidationError}
              v={blog}
              vsetter={setBlog}
              required
            />
            <Input
              label="Status"
              type="select"
              name="status"
              error={validationError}
              errsetter={setValidationError}
              v={blog}
              vsetter={setBlog}
              options={[
                { label: "Active", value: 1 },
                { label: "De-Active", value: 0 },
              ]}
            />
          </div>
          <div className="form-element">
          <div className="form-label">
              Cover Image
          </div>
          <FileUpload
              name="cover_image"
              size="auto"
              value={blog?.cover_image}
            />
          </div>
          <div className="form-element">
            <div className="form-label">Blog Content</div>
            <Editor
              onInit={(e, editor) => (editorRef.current = editor)}
              init={{
                height: 300,
                menubar: false,
              }}
              initialValue={blog?.content}
              apiKey={process.env.TINY_API_KEY}
            />
          </div>
          <Input
            label="Meta Title"
            type="text"
            name="meta_title"
            error={validationError}
            errsetter={setValidationError}
            v={blog}
            vsetter={setBlog}
          />
          <Input
            label="Meta Keywords"
            type="text"
            name="meta_keywords"
            error={validationError}
            errsetter={setValidationError}
            v={blog}
            vsetter={setBlog}
          />
          <Input
            label="Meta Description"
            type="textarea"
            name="meta_description"
            error={validationError}
            errsetter={setValidationError}
            v={blog}
            vsetter={setBlog}
          />
          <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
            Submit
          </button>
        </form>
      </div>}
    </>
  );
}

export default Edit;
