"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export const SingleCoursePage = () => {
  const { courseId } = useParams();
  const [session, setSession] = useState(null);
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

      if (!enrolledCourses) {
        fetch(`/api/courses?email=${session.user.email}`)
          .then((res) => res.json())
          .then((data) => {
            sessionStorage.setItem(
              "enrolled-courses",
              JSON.stringify(data.courses)
            );
            const thisCourse = data.courses.find(
              (course) => course.course.id === courseId
            );
            setCourse(thisCourse.course);
            setProgress(thisCourse.userSectionProgress);
            setLoading(false);
          });
      } else {
        const cacheCourse = enrolledCourses.find(
          (course) => course.course.id === courseId
        );
        setCourse(cacheCourse.course);
        setProgress(cacheCourse.userSectionProgress);
        setLoading(false);
      }
    }
  }, [session]);

  const calculateCourseDuration = () => {
    let totalDurationSeconds = 0;
    if (progress) {
      progress.forEach((userSection) => {
        if (userSection.section.duration) {
          totalDurationSeconds += userSection.section.duration;
        }
      });
    }
    // Convertir la duración total de segundos a minutos
    const totalDurationMinutes = Math.floor(totalDurationSeconds / 60);
    return totalDurationMinutes;
  };

  const calculateProgression = () => {
    const completedSections = progress.filter(
      (section) => section.finished
    ).length;
    // Calcula el progreso como el porcentaje de secciones completadas
    const progressTotal = Math.round(
      (completedSections / progress.length) * 100
    );

    return progressTotal;
  };

  return (
    <>
      {isLoading ? (
        <p className="h-full w-full flex justify-center items-center">
          Loading...
        </p>
      ) : (
        <>
          <h1 className="text-[38px] font-bold mt-10 mb-6 custom-black">
            {course.title}
          </h1>
          <img
            src={course.imageUrl}
            alt="courseImage"
            className="rounded-lg w-3/4 mx-auto"
          />
          <div className="flex gap-8 my-4">
            <p>Course Total duration: {calculateCourseDuration()} mins</p>
            <p>Progress: {calculateProgression()}%</p>
          </div>
          <p className="mt-2 text-[18px] custom-black">{course.description}</p>
          <div className="flex flex-col gap-4 mt-4">
            <h2 className="mt-2 text-[24px] custom-black">Sections</h2>
            {progress
              .sort((a, b) => a.section.number - b.section.number)
              .map((section, index) => {
                return (
                  <Link
                    href={`/courses/${course.id}/${section.id}`}
                    key={section.id}
                    className="bg-slate-200 hover:bg-slate-300 transition-all duration-300 p-5 rounded-md flex flex-col justify-between"
                  >
                    <div className="flex justify-between">
                      <h2 className="font-semibold text-lg mb-2">
                        {index + 1}. {section.section.title}
                      </h2>
                      <p
                        className={`${
                          section.finished ? "text-lime-700" : "text-red-700"
                        } italic text-sm`}
                      >
                        {section.finished ? "Completed" : "Not completed"}
                      </p>
                    </div>
                    <p>{section.section.description}</p>
                    <div className="flex flex-col items-end w-full">
                      <p className="w-fit flex gap-1 items-center text-right">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="#000"
                            d="M512 832a320 320 0 1 0 0-640a320 320 0 0 0 0 640m0 64a384 384 0 1 1 0-768a384 384 0 0 1 0 768"
                          />
                          <path
                            fill="#000"
                            d="m292.288 824.576l55.424 32l-48 83.136a32 32 0 1 1-55.424-32zm439.424 0l-55.424 32l48 83.136a32 32 0 1 0 55.424-32zM512 512h160a32 32 0 1 1 0 64H480a32 32 0 0 1-32-32V320a32 32 0 0 1 64 0zM90.496 312.256A160 160 0 0 1 312.32 90.496l-46.848 46.848a96 96 0 0 0-128 128L90.56 312.256zm835.264 0A160 160 0 0 0 704 90.496l46.848 46.848a96 96 0 0 1 128 128z"
                          />
                        </svg>
                        {Math.round(section.section.duration / 60)} min
                      </p>
                    </div>
                  </Link>
                );
              })}
            <h2 className="mt-2 text-[24px] custom-black">Exam</h2>
            <p>
              This course has an exam at the end, you can start it when you finish all the sections. Are you ready?
            </p>

            <Link href={`/courses/${courseId}/exam`} className="special-button duration-300 transition-all p-3 rounded-md text-white mt-4 w-fit">
              Start the exam!
            </Link>
          </div>
        </>
      )}
    </>
  );
};
