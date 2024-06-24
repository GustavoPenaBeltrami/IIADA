"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export const CoursePublicInfo = () => {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      fetch("/api/auth/")
        .then((res) => res.json())
        .then((data) => {
          setSession(data.session);
        });
    }
  }, []);

  useEffect(() => {
    const cacheKey = `catalog-${courseId}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    } else if (courseId) {
      fetch(`/api/catalog?courseId=${courseId}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data.course);
          sessionStorage.setItem(cacheKey, JSON.stringify(data.course));
          setLoading(false);
        });
    }
  }, [courseId]);

  useEffect(() => {
    if (session && data) {
      const cachedEnrolledCourses = sessionStorage.getItem("enrolled-courses");
      if (!cachedEnrolledCourses) {
        fetch(`/api/courses?email=${session.user.email}`)
          .then((res) => res.json())
          .then((info) => {
            sessionStorage.setItem(
              "enrolled-courses",
              JSON.stringify(info.courses)
            );
            const isEnrolled = info.courses.some(
              (course) => course.course.id === data.id
            );
            setEnrolled(isEnrolled);
          });
      } else {
        const enrolledCourses = JSON.parse(cachedEnrolledCourses);
        const isEnrolled = enrolledCourses.some(
          (course) => course.course.id === data.id
        );
        setEnrolled(isEnrolled);
      }
    }
  }, [session, data]);

  const handlePay = (course) => {
    if (!session) {
      router.push("/login");
    } else {
      fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: { id: course.id, title: course.title, price: course.price },
          userId: session.user.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.ok){
            toast.error(data.error);
          }
          if (data.url) {
            sessionStorage.removeItem("enrolled-courses");
            router.push(data.url);
          }
        });
    }
};

  return (
    <>
      {isLoading ? (
        <p className="h-full w-full flex justify-center items-center">
          Loading...
        </p>
      ) : (
        <div className="flex flex-row pt-20">
          <div className="w-4/12 flex flex-col">
            <img
              src={data.imageUrl}
              className="w-[300px] mx-auto rounded-xl"
            ></img>
            {enrolled && (
              <Link
                href={`/courses/${data.id}`}
                className=" special-button w-fit p-4 mx-auto mt-10 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Go to course
              </Link>
            )}
            {!enrolled && <button
              onClick={() => handlePay(data)}
              className=" special-button w-fit p-4 mx-auto mt-10 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Get this course (${data.price})
            </button>}

          </div>
          <div className="w-8/12  flex flex-col">
            <h3 className="text-md text-gray-500 pl-4">
              Iiada: Inadiana independent auto dealers association
            </h3>
            <h1 className="text-2xl font-bold custom-text pl-4">
              {data.title}
            </h1>
            <p className="mt-5 pl-4">{data.description}</p>

            <div>
              <h5 className="bg-blue-100 my-4 py-2 px-4 rounded-lg">
                Course content
              </h5>
              <ul>
                <li className="pl-4 flex flex-row gap-x-2 items-center">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="black"
                      d="M3.264 8.579a.683.683 0 0 1-.975 0a.704.704 0 0 1 0-.987L8.32 1.5C9.68.444 11.048-.063 12.41.006c1.716.088 3.052.742 4.186 1.815C17.752 2.915 18.5 4.476 18.5 6.368c0 1.452-.422 2.73-1.313 3.864l-8.503 8.76c-.86.705-1.816 1.046-2.84 1.005c-1.3-.054-2.267-.474-2.986-1.185c-.842-.831-1.358-1.852-1.358-3.225c0-1.092.377-2.1 1.155-3.046L10.139 4.9c.6-.64 1.187-1.02 1.787-1.112a2.486 2.486 0 0 1 2.2.755c.532.563.76 1.265.68 2.064c-.055.545-.278 1.047-.688 1.528l-6.88 7.048a.683.683 0 0 1-.974.006a.704.704 0 0 1-.006-.987l6.847-7.012c.2-.235.305-.472.33-.724c.04-.4-.056-.695-.305-.958a1.118 1.118 0 0 0-1-.34c-.243.037-.583.258-1.002.704l-7.453 7.607c-.537.655-.797 1.35-.797 2.109c0 .954.345 1.637.942 2.226c.475.47 1.12.75 2.08.79c.68.027 1.31-.198 1.858-.642l8.397-8.65c.645-.827.967-1.8.967-2.943c0-1.482-.577-2.684-1.468-3.528c-.91-.862-1.95-1.37-3.313-1.44c-1.008-.052-2.065.34-3.117 1.146z"
                    />
                  </svg>
                  Lorem ipsum 1
                </li>
                <li className="pl-4 flex flex-row gap-x-2 items-center">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="black"
                      d="M3.264 8.579a.683.683 0 0 1-.975 0a.704.704 0 0 1 0-.987L8.32 1.5C9.68.444 11.048-.063 12.41.006c1.716.088 3.052.742 4.186 1.815C17.752 2.915 18.5 4.476 18.5 6.368c0 1.452-.422 2.73-1.313 3.864l-8.503 8.76c-.86.705-1.816 1.046-2.84 1.005c-1.3-.054-2.267-.474-2.986-1.185c-.842-.831-1.358-1.852-1.358-3.225c0-1.092.377-2.1 1.155-3.046L10.139 4.9c.6-.64 1.187-1.02 1.787-1.112a2.486 2.486 0 0 1 2.2.755c.532.563.76 1.265.68 2.064c-.055.545-.278 1.047-.688 1.528l-6.88 7.048a.683.683 0 0 1-.974.006a.704.704 0 0 1-.006-.987l6.847-7.012c.2-.235.305-.472.33-.724c.04-.4-.056-.695-.305-.958a1.118 1.118 0 0 0-1-.34c-.243.037-.583.258-1.002.704l-7.453 7.607c-.537.655-.797 1.35-.797 2.109c0 .954.345 1.637.942 2.226c.475.47 1.12.75 2.08.79c.68.027 1.31-.198 1.858-.642l8.397-8.65c.645-.827.967-1.8.967-2.943c0-1.482-.577-2.684-1.468-3.528c-.91-.862-1.95-1.37-3.313-1.44c-1.008-.052-2.065.34-3.117 1.146z"
                    />
                  </svg>
                  Lorem ipsum 2
                </li>
              </ul>
            </div>

            <div>
              <h5 className="bg-blue-100 my-4 py-2 px-4 rounded-lg">
                Completion Rules
              </h5>
              <li className="pl-4 flex flex-row gap-x-2 items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="black"
                    d="M3.264 8.579a.683.683 0 0 1-.975 0a.704.704 0 0 1 0-.987L8.32 1.5C9.68.444 11.048-.063 12.41.006c1.716.088 3.052.742 4.186 1.815C17.752 2.915 18.5 4.476 18.5 6.368c0 1.452-.422 2.73-1.313 3.864l-8.503 8.76c-.86.705-1.816 1.046-2.84 1.005c-1.3-.054-2.267-.474-2.986-1.185c-.842-.831-1.358-1.852-1.358-3.225c0-1.092.377-2.1 1.155-3.046L10.139 4.9c.6-.64 1.187-1.02 1.787-1.112a2.486 2.486 0 0 1 2.2.755c.532.563.76 1.265.68 2.064c-.055.545-.278 1.047-.688 1.528l-6.88 7.048a.683.683 0 0 1-.974.006a.704.704 0 0 1-.006-.987l6.847-7.012c.2-.235.305-.472.33-.724c.04-.4-.056-.695-.305-.958a1.118 1.118 0 0 0-1-.34c-.243.037-.583.258-1.002.704l-7.453 7.607c-.537.655-.797 1.35-.797 2.109c0 .954.345 1.637.942 2.226c.475.47 1.12.75 2.08.79c.68.027 1.31-.198 1.858-.642l8.397-8.65c.645-.827.967-1.8.967-2.943c0-1.482-.577-2.684-1.468-3.528c-.91-.862-1.95-1.37-3.313-1.44c-1.008-.052-2.065.34-3.117 1.146z"
                  />
                </svg>
                Lorem ipsum 1
              </li>
              <li className="pl-4 flex flex-row gap-x-2 items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="black"
                    d="M3.264 8.579a.683.683 0 0 1-.975 0a.704.704 0 0 1 0-.987L8.32 1.5C9.68.444 11.048-.063 12.41.006c1.716.088 3.052.742 4.186 1.815C17.752 2.915 18.5 4.476 18.5 6.368c0 1.452-.422 2.73-1.313 3.864l-8.503 8.76c-.86.705-1.816 1.046-2.84 1.005c-1.3-.054-2.267-.474-2.986-1.185c-.842-.831-1.358-1.852-1.358-3.225c0-1.092.377-2.1 1.155-3.046L10.139 4.9c.6-.64 1.187-1.02 1.787-1.112a2.486 2.486 0 0 1 2.2.755c.532.563.76 1.265.68 2.064c-.055.545-.278 1.047-.688 1.528l-6.88 7.048a.683.683 0 0 1-.974.006a.704.704 0 0 1-.006-.987l6.847-7.012c.2-.235.305-.472.33-.724c.04-.4-.056-.695-.305-.958a1.118 1.118 0 0 0-1-.34c-.243.037-.583.258-1.002.704l-7.453 7.607c-.537.655-.797 1.35-.797 2.109c0 .954.345 1.637.942 2.226c.475.47 1.12.75 2.08.79c.68.027 1.31-.198 1.858-.642l8.397-8.65c.645-.827.967-1.8.967-2.943c0-1.482-.577-2.684-1.468-3.528c-.91-.862-1.95-1.37-3.313-1.44c-1.008-.052-2.065.34-3.117 1.146z"
                  />
                </svg>
                Lorem ipsum 2
              </li>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
