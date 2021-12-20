import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { addMcq } from "../../../lib/mcqs";
import { FiAlertCircle, FiCheck, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Loader from "../../../components/loader";
import { FaTimes } from "react-icons/fa";

function Add() {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: new Date(),
    },
  ]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const mcq = new FormData(document.forms.mcq);
    const iserror = Object.keys(validationError).filter(
      (index) => validationError[index] !== false
    );
    if (!iserror?.length) {
      submitData(mcq);
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

  const submitData = async (mcq) => {
    const response = await addMcq(mcq);
    if (response?.status) {
      setIsAdded(true);
      setIsLoading(false);
      setValidationError(false);
      document.querySelector(".main").scrollIntoView();
      document.forms?.mcq?.reset();
    } else if (response?.error) {
      setIsAdded(false);
      setValidationError(response.error);
      document.querySelector(".main").scrollIntoView();
      setIsLoading(false);
    }
  };

  const AllMcq = () => {
    return (
      <Link href="/admin/mcqs">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Mcqs
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Add Mcq | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="Mcqs" subtitle="Add New" right={<AllMcq />} />
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
            New Mcq added successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="mcq">
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
            <div className="form-element">
              <label className="form-label">Title</label>
              <input type="text" name="title" className="form-input" />
            </div>
            <div className="form-element">
              <label className="form-label">Time (in minutes)</label>
              <input
                type="number"
                min={1}
                name="total_time"
                className="form-input"
              />
            </div>
          </div>
          <div className="form-element">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-input"></textarea>
          </div>
          <hr />
          <h5 className="mt-3">Questions</h5>
          <div className="mt-3">
            {questions?.length > 0 &&
              questions.map((q, i) => (
                <div className="p-3 bg-gray-50 border relative mb-2" key={i}>
                  {i !== 0 && (
                    <FaTimes
                      className="absolute right-2 top-2 text-red-500 cursor-pointer"
                      onClick={() => {
                        setQuestions((prev) =>
                          prev.filter((f) => f.id !== q.id)
                        );
                      }}
                    />
                  )}
                  <div className="form-element">
                    <label className="form-label">
                      {i + 1}. Question Title
                    </label>
                    <input
                      type="text"
                      name="question_title[]"
                      className="form-input"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-2">
                    <div className="form-element">
                      <label className="form-label">Choice 1</label>
                      <input
                        type="text"
                        name="question_option1[]"
                        className="form-input"
                      />
                    </div>
                    <div className="form-element">
                      <label className="form-label">Choice 2</label>
                      <input
                        type="text"
                        name="question_option2[]"
                        className="form-input"
                      />
                    </div>
                    <div className="form-element">
                      <label className="form-label">Choice 3</label>
                      <input
                        type="text"
                        name="question_option3[]"
                        className="form-input"
                      />
                    </div>
                    <div className="form-element">
                      <label className="form-label">Choice 4</label>
                      <input
                        type="text"
                        name="question_option4[]"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-2">
                    <div className="form-element">
                      <label className="form-label">Answer</label>
                      <input
                        type="text"
                        name="question_answer[]"
                        className="form-input"
                      />
                    </div>
                    <div className="form-element">
                      <label className="form-label">Marks</label>
                      <input
                        type="number"
                        min={1}
                        name="question_mark[]"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              ))}

            <div
              onClick={() => {
                setQuestions((prev) => [...prev, { id: new Date() }]);
              }}
              className="my-3 w-10 h-10 flex items-center justify-center cursor-pointer bg-gray-200"
            >
              <FiPlus className="text-2xl" />
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
