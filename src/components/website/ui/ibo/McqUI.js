import React from "react";
import {
  getMcqs,
  saveAnswers,
} from "../../../../lib/frontend/training_management";
import Loader from "../../../loader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowAltCircleLeft,
} from "react-icons/fa";

function McqUI() {
  const [mcqs, setMcqs] = React.useState([]);
  const [opened, setOpened] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [timeTaken, setTimeTaken] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [timer, setTimer] = React.useState(null);
  const [timerQ, setTimerQ] = React.useState(null);
  const [eachQusTime, setEachQusTime] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [reload, setReload] = React.useState(null);
  const [viewAnswer, setViewAnswer] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    if (start) {
      setQuestions(opened?.questions);
      //start the timer
      setTimer(
        setInterval(() => {
          setTimeTaken((prev) => prev + 1);
        }, 1000)
      );

      setTimerQ(
        setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000)
      );
    }
  }, [start]);

  React.useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(eachQusTime);
      if (document.forms.mcq_test && start) {
        handleAnswer();
      }
      setIndex((prev) => prev + 1);
    }
  }, [timeLeft]);

  React.useEffect(() => {
    setTimeLeft(eachQusTime);
  }, [index]);

  React.useEffect(() => {
    const fetchMcqs = async () => {
      setIsLoading(true);
      const res = await getMcqs();
      if (res?.status) {
        setMcqs(res?.data);
        setIsLoading(false);
        setOpened(false);
        setStart(false);
      } else {
        toast.error(res?.message || res?.error);
        setIsLoading(false);
      }
    };

    fetchMcqs();

    return () => {
      setMcqs([]);
      setOpened(false);
      clearInterval(timer);
      clearInterval(timerQ);
      setTimerQ(null);
      setTimer(null);
      setTimeTaken(0);
      setTimeLeft(0);
    };
  }, [reload]);

  const endMcq = () => {
    setOpened(false);
    setStart(false);
    clearInterval(timerQ);
    clearInterval(timer);
    setTimer(null);
    setTimerQ(null);
    setIndex(index ? 0 : 1);
    setTimeTaken(0);
    setTimeLeft(0);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("mcq_id", opened?.id);
    formdata.append("time_taken", timeTaken);

    answers.forEach((obj) => {
      formdata.append("question_id[]", obj.question_id);
      formdata.append("question_answer[]", obj.question_answer);
    });

    const res = await saveAnswers(formdata);
    if (res?.status) {
      setIsLoading(false);
      toast.success("Answers submitted successfully.");
      setOpened(false);
      setStart(false);
      clearInterval(timerQ);
      clearInterval(timer);
      setTimer(null);
      setTimerQ(null);
      setIndex(0);
      setReload(new Date());
    } else {
      toast.error(res?.error || res?.message);
      setIsLoading(false);
      clearInterval(timerQ);
      clearInterval(timer);
      setTimer(null);
      setTimerQ(null);
    }
  };

  const handleAnswer = () => {
    const form = document.forms.mcq_test;
    const data = {
      question_id: form.question_id.value,
      question_answer: form.answer.value,
    };
    setAnswers((prev) => [...prev, data]);
  };

  return (
    <div className="flex items-start flex-col px-4">
      {isLoading && <Loader />}
      <h5
        style={{ fontFamily: "Opensans-bold" }}
        className="text-white flex items-center"
      >
        <FaArrowAltCircleLeft
          className="mr-3 cursor-pointer"
          onClick={() => router.back()}
        />
        MCQ Tests
      </h5>

      <div className="mt-5 w-full bg-white rounded-md overflow-hidden">
        <table className="table">
          <thead style={{ fontFamily: "Opensans-semi-bold" }}>
            <tr>
              <th>MCQ Name</th>
              <th>Questions</th>
              <th>Time</th>
              <th>Marks</th>
              <th>Attended</th>
              <th>Obtained Marks</th>
              <th>Time Taken</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mcqs?.length > 0 ? (
              mcqs.map((m, i) => (
                <tr key={i}>
                  <td>{m?.title}</td>
                  <td>{m?.total_questions}</td>
                  <td>{m?.total_time} minutes</td>
                  <td>{m?.total_marks}</td>
                  <td>
                    {m?.evaluation?.id ? (
                      <p className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" /> Yes
                      </p>
                    ) : (
                      <p className="flex items-center">
                        <FaTimesCircle className="text-red-500 mr-2" /> No
                      </p>
                    )}
                  </td>
                  <td>{m?.evaluation?.total_marks_obtained || "-"}</td>
                  <td>
                    {m?.evaluation?.total_time_taken
                      ? m?.evaluation?.total_time_taken + " minutes"
                      : "-"}
                  </td>
                  <td>
                    {m?.evaluation?.id ? (
                      <button
                        onClick={() =>
                          setViewAnswer(JSON.parse(m?.evaluation?.answers))
                        }
                        className="px-2 py-1 text-white rounded-md bg-blue-600"
                      >
                        View Answers
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setOpened(m);
                          setTimeLeft(
                            (m?.total_time * 60) / m?.total_questions
                          );
                          setEachQusTime(
                            (m?.total_time * 60) / m?.total_questions
                          );
                        }}
                        className="px-2 py-1 text-white rounded-md bg-green-600"
                      >
                        Attend
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-red-500">
                <td colSpan={10}>No MCQs found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/**attend options */}
      {opened && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white z-40 flex items-start justify-between">
          <div className="border-r max-w-xs w-full h-screen bg-gray-50 p-5 flex-col flex items-center">
            <h4 style={{ fontFamily: "Opensans-bold" }}>MCQ Test</h4>
            <div
              className="mt-5 text-sm"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <p className="flex items-center justify-center flex-col">
                Total Questions:{" "}
                <b className="text-2xl">{opened?.total_questions}</b>
              </p>
              <p className="flex items-center justify-center flex-col my-5">
                Total Time:{" "}
                <b className="text-2xl">{opened?.total_time} minutes</b>
              </p>
              <p className="flex items-center justify-center flex-col">
                Total Marks: <b className="text-2xl">{opened?.total_marks}</b>
              </p>
            </div>
            <div className="mt-10">
              <button
                onClick={() => setStart(true)}
                className="block p-3 w-52 rounded-md text-white mt-2 bg-green-500"
              >
                Start
              </button>
              <button
                onClick={endMcq}
                className="block w-52 p-3 rounded-md text-white mt-2 bg-red-500"
              >
                End
              </button>
            </div>

            {start && (
              <div className="mt-3 flex items-center justify-center flex-col">
                <h6 style={{ fontFamily: "Opensans-semi-bold" }}>Time Taken</h6>
                <b className="text-2xl">
                  {timeTaken < 60
                    ? timeTaken + "s"
                    : Math.floor(timeTaken / 60) +
                      "m : " +
                      (timeTaken - Math.floor(timeTaken / 60) * 60) +
                      "s"}
                </b>
              </div>
            )}
          </div>
          <div className="flex-1 h-screen flex items-center justify-center flex-col">
            {start && (
              <p
                style={{ fontFamily: "Opensans-bold" }}
                className={`mb-5 ${
                  index <= opened?.total_questions
                    ? "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                    : "p-3 bg-gray-100 rounded-full"
                }`}
              >
                {index <= opened?.total_questions
                  ? index
                  : "Question Completed"}
              </p>
            )}
            {start ? (
              <div className="p-5 bg-white border rounded-md flex items-center justify-center max-w-xl w-full">
                {index <= opened?.total_questions ? (
                  <form
                    name="mcq_test"
                    className="flex items-center justify-center flex-col w-full"
                  >
                    <p>
                      {eachQusTime}s/{timeLeft}s
                    </p>
                    <h5 style={{ fontFamily: "Opensans-bold" }}>
                      {questions[index - 1]?.title}
                    </h5>
                    <div className="flex items-center justify-between mt-8 w-full">
                      <input
                        type="hidden"
                        name="question_id"
                        value={questions[index - 1]?.id}
                      />
                      <label className="cursor-pointer">
                        <span className="mr-3 capitalize">
                          {questions[index - 1]?.option1}
                        </span>
                        <input
                          type="radio"
                          name="answer"
                          value={questions[index - 1]?.option1}
                        />
                      </label>
                      <label className="cursor-pointer">
                        <span className="mr-3 capitalize">
                          {questions[index - 1]?.option2}
                        </span>
                        <input
                          type="radio"
                          name="answer"
                          value={questions[index - 1]?.option2}
                        />
                      </label>
                      <label className="cursor-pointer">
                        <span className="mr-3 capitalize">
                          {questions[index - 1]?.option3}
                        </span>
                        <input
                          type="radio"
                          name="answer"
                          value={questions[index - 1]?.option3}
                        />
                      </label>
                      <label className="cursor-pointer">
                        <span className="mr-3 capitalize">
                          {questions[index - 1]?.option4}
                        </span>
                        <input
                          type="radio"
                          name="answer"
                          value={questions[index - 1]?.option4}
                        />
                      </label>
                    </div>
                  </form>
                ) : (
                  <p>Please submit your answer!</p>
                )}
              </div>
            ) : (
              <p>Start to see the question.</p>
            )}

            {start && index <= questions?.length ? (
              <p
                style={{ fontFamily: "Opensans-bold" }}
                className="mt-3 bg-gray-100 p-3 rounded-md cursor-pointer"
                onClick={() => {
                  if (index <= questions?.length) {
                    setIndex((prev) => prev + 1);
                    handleAnswer();
                    document.forms.mcq_test.reset();
                  }
                  if (index > questions?.length) {
                    clearInterval(timer);
                    clearInterval(timerQ);
                    setTimer(null);
                    setTimerQ(null);
                  }
                }}
              >
                Next
              </p>
            ) : (
              start && (
                <button
                  onClick={submitHandler}
                  className="px-2 py-3 bg-green-600 text-white rounded-md mt-5"
                >
                  Submit Your Answer
                </button>
              )
            )}
          </div>
        </div>
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
                Your Answer: {v?.ibo_answer}
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
  );
}

export default McqUI;
