"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GenerateCertificate } from "./GenerateCertificate";
import { useRouter } from "next/navigation";

export const Exam = () => {
  const { courseId } = useParams();
  const [session, setSession] = useState(null);
  const [test, setTest] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState();

  const router = useRouter();

  useEffect(() => {
    const userRAW = sessionStorage.getItem("session");
    const user = userRAW ? JSON.parse(userRAW) : null;

    if (!user) {
      fetch("/api/auth/")
        .then((res) => res.json())
        .then((data) => {
          setSession(data.session);
          sessionStorage.setItem("session", JSON.stringify(data.session));
        });
    } else {
      setSession(user);
    }
  }, []);

  useEffect(() => {
    if (session) {
      const enrolledCourses = JSON.parse(
        sessionStorage.getItem("enrolled-courses")
      );

      if (!enrolledCourses || enrolledCourses.length === 0) {
        fetch(`/api/courses?email=${session.user.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.courses.length === 0) {
              router.push("/courses");
              return;
            }
            sessionStorage.setItem(
              "enrolled-courses",
              JSON.stringify(data.courses)
            );
            const thisCourse = data.courses.find(
              (course) => course.course.id === courseId
            );
            if (!thisCourse) {
              router.push("/courses");
              return;
            }
          });
      } else {
        const course = enrolledCourses.find(
          (course) => course.course.id === courseId
        );
        if (!course) {
          router.push("/courses");
          return;
        } else {
          const cacheTest = sessionStorage.getItem(`test-${courseId}`);
          if (!cacheTest) {
            fetch(`/api/exam?courseId=${courseId}`)
              .then((res) => res.json())
              .then((data) => {
                setTest(data.tests);
                sessionStorage.setItem(
                  `test-${courseId}`,
                  JSON.stringify(data.tests)
                );
                setLoading(false);
              });
          } else {
            setTest(JSON.parse(cacheTest));
            setLoading(false);
          }
        }
      }
    }
  }, [session]);

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    fetch(`/api/exam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: courseId,
        answers: Object.entries(answers).map(([questionId, answerId]) => ({
          questionId,
          answerId,
        })),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitting(false);
        setSubmitted(data);
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
      });
  };

  const handleRetry = () => {
    setSubmitted(null);
    setAnswers({});
    router.refresh();
  }

  if (isLoading) {
    return (
      <p className="h-full w-full flex justify-center items-center">
        Loading...
      </p>
    );
  }

  return (
    <div>
      <Link
        className="bg-custom text-white py-2 px-4 flex w-fit rounded-md gap-2"
        href={`/courses/${courseId}`}
      >
        <span>&#8592;</span> <p>Return to the course</p>
      </Link>
      {test && !submitting && !submitted && (
        <>
          <h1 className="text-[38px] font-bold mt-6 mb-6 custom-black">
            Exam has started!
          </h1>
          <p className="mb-4">
            If you need to review the material and revisit any classes, you are
            welcome to do so at your convenience. You can try the exam later!
          </p>
          {test[0]?.questions.map((question) => (
            <div key={question.id}>
              <p className="text-lg mb-2 mt-5 custom-text font-medium">
                {question.number}. {question.text}
              </p>
              {question.answers.map((answer) => (
                <div className="my-1" key={answer.id}>
                  <input
                    type="radio"
                    id={answer.id}
                    name={question.id}
                    value={answer.id}
                    className="mr-2"
                    onChange={() => handleAnswerChange(question.id, answer.id)}
                  />
                  <label htmlFor={answer.id}>{answer.text}</label>
                </div>
              ))}
            </div>
          ))}
          <div className="w-full flex justify-end">
            <button
              className="special-button px-4 py-2 rounded-md duration-300 transition-all"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      )}

      {submitting && (
        <>
          <h1 className="text-[38px] font-bold mt-6 mb-6 custom-black">
            Exam has started!
          </h1>
          <p className="mb-4">
            If you need to review the material and revisit any classes, you are
            welcome to do so at your convenience. You can try the exam later!
          </p>
          <p>Submitting answers...</p>
        </>
      )}
      {submitted && (
        <div>
          <h1 className="text-[38px] font-bold mt-6 mb-6 custom-black">
            Exam submitted!
          </h1>
          <p>
            You got {submitted.correctAnswers} correct answers and got an
            overall score of {submitted.score}/100!
          </p>
          {
            // If the user got a score of 70 or more, show the certificate generator
            submitted.score >= 70 ? (
              <GenerateCertificate />
            ) : (
              // Otherwise, show a message to try again
              <p className="mt-10 text-red-700 text-xl">
                You need a score of 70 or more to pass the exam. Come back to the course to keep learning and try again!
                <br/>
                Or you can try again now!
                <button
                  className="bg-custom text-white py-2 px-4 flex w-fit rounded-md gap-2 mt-10"
                  onClick={() => handleRetry()}
                > Retry</button>
              </p>
              
            )
          }
        </div>
      )}
    </div>
  );
};
