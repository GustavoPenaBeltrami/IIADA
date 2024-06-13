"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const MyCourses = () => {
  const [session, setSession] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("session");

    if (!session || !user) {
      fetch("/api/auth/")
        .then((res) => res.json())
        .then((data) => {
          setSession(data.session);
          sessionStorage.setItem("session", JSON.stringify(data.session));
        });
    } else{
      setSession(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (session) {
      const cachedEnrolledCourses = sessionStorage.getItem("enrolled-courses");

      if (!cachedEnrolledCourses) {
        fetch(`/api/courses?email=${session.user.email}`)
          .then((res) => res.json())
          .then((data) => {
            setData(data.courses);
            setLoading(false);
            sessionStorage.setItem(
              "enrolled-courses",
              JSON.stringify(data.courses)
            );
          });
      } else{
        setData(JSON.parse(cachedEnrolledCourses));
        setLoading(false);
      }
}
  }, [session]);

  if (isLoading) {
    return <div className="min-h-[600px]">Loading...</div>;
  }

  if (!session) {
    return <div className="min-h-[600px]">No active session</div>;
  }
  return (
    <>
      <div className="min-h-[600px]">
        {data.map((userCourse, index) => {
          // Calcula el número de secciones completadas
          const completedSections = userCourse.userSectionProgress.filter(
            (section) => section.finished
          ).length;
          // Calcula el progreso como el porcentaje de secciones completadas
          const progress = Math.round(
            (completedSections / userCourse.userSectionProgress.length) * 100
          );

          return (
            <Link
              href={`/courses/${userCourse.course.id}`}
              key={userCourse.course.id}
              className="bg-slate-200 p-3 rounded-md flex justify-between"
            >
              <h2>{userCourse.course.title}</h2>
              {/* Muestra el progreso */}
              <div className="flex gap-4">
                <p className="text-slate-400 italic font-thin">{`${completedSections}/${userCourse.userSectionProgress.length} completed`}</p>
                <p>{`${progress}%`}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );


};
