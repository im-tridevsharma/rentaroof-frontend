import React, { useEffect, useState } from "react";
import Head from "next/head";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import { getEvaluations, deleteEvaluation } from "../../../lib/mcqs";
import { useDispatch } from "react-redux";
import Datatable from "../../../components/datatable";
import ReactTooltip from "react-tooltip";
import { FaCheckCircle, FaTimes, FaTimesCircle } from "react-icons/fa";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [viewAnswer, setViewAnswer] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getEvaluations();
      if (response?.status) {
        setEvaluations(response.data);
        setIsLoading(false);
      } else {
        dispatch({
          type: "SET_CONFIG_KEY",
          key: "notification",
          value: {
            content:
              response?.error || response?.message || response?.exception,
            outerClassNames: "bg-red-400",
            innerClassNames: "",
            icon: <FiAlertCircle className="mr-2" />,
            animation: "",
            visible: true,
          },
        });
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  //all training button
  const AllEvaluation = () => {
    return (
      <div className="flex items-center">
        <button
          onClick={() => setIsRefresh(!isRefresh)}
          data-tip="Refresh"
          className="p-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
        >
          <FiRefreshCw className="text-lg" />
          <ReactTooltip />
        </button>
      </div>
    );
  };

  const viewAnswers = (id) => {
    setViewAnswer(
      evaluations?.filter((e) => e.id === id)[0]?.answers
        ? JSON.parse(evaluations?.filter((e) => e.id === id)[0]?.answers)
        : false
    );
  };

  const delEvaluation = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteEvaluation(id);
      if (response?.status) {
        setIsLoading(false);
        const new_evaluations = evaluations.filter(
          (item) => item.id !== response.data.id
        );
        setEvaluations(new_evaluations);
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>All Evaluations | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Evaluations"
        subtitle="All Evaluations"
        right={<AllEvaluation />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {evaluations?.length ? (
          <Table
            evaluations={evaluations}
            del={delEvaluation}
            view={viewAnswers}
          />
        ) : (
          <p className="mt-5">No evaluations found!</p>
        )}
        {viewAnswer && (
          <div className="p-5 bg-white rounded-md absolute top-0 left-0 w-full h-full overflow-y-auto">
            <p className="flex items-center justify-end">
              <FaTimes
                onClick={() => setViewAnswer(false)}
                className="text-red-500 cursor-pointer"
              />
            </p>
            {viewAnswer?.map((v, i) => (
              <div key={i} className="my-2 p-2 bg-gray-50">
                <h6>{v?.name}</h6>
                <p className="flex items-center justify-start">
                  IBO Answer: {v?.ibo_answer}
                  {v?.is_correct ? (
                    <FaCheckCircle className="text-green-500 ml-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 ml-2" />
                  )}
                </p>
                <p>Correct Answer: {v?.correct}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ evaluations, del, view }) => {
  const columns = [
    {
      Header: "MCQ Title",
      accessor: "mcq_title",
    },
    {
      Header: "IBO",
      accessor: "ibo_name",
    },
    {
      Header: "Total Questions",
      accessor: "total_questions",
    },
    {
      Header: "Total Answered",
      accessor: "answered_questions",
    },
    {
      Header: "Marks Obtained",
      accessor: "total_marks_obtained",
    },
    {
      Header: "Time Taken",
      accessor: "total_time_taken",
      Cell: (props) => (
        <p>
          {props.value} {props.value === 1 ? "minute" : "minutes"}
        </p>
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: (props) => {
        return (
          <>
            <button
              onClick={() => del(props.value)}
              data-tip="Remove"
              className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
            >
              <FiTrash />
            </button>

            <button
              onClick={() => view(props.value)}
              data-tip="View"
              className="btn px-2 py-1 ml-2 bg-blue-400 rounded-md hover:bg-blue-500"
            >
              <FiEye />
            </button>
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={evaluations} />;
};
