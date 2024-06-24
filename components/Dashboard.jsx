"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { format } from "date-fns";

export const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!session) {
      fetch("/api/auth/")
        .then((res) => res.json())
        .then((data) => {
          setSession(data.session);
        });
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      const cachedEnrolledCourses = sessionStorage.getItem("enrolled-courses");

      if (!cachedEnrolledCourses) {
        fetch(`/api/courses?email=${session.user.email}`)
          .then((res) => res.json())
          .then((data) => {
            setData(data.courses);
            sessionStorage.setItem(
              "enrolled-courses",
              JSON.stringify(data.courses)
            );
            setLoading(false);
          });
      } else {
        setData(JSON.parse(cachedEnrolledCourses));
        setLoading(false);
      }
    }
  }, [session]);

  return (
    <>
      {session && (
        <>
          <h1 className="text-[38px] font-bold mt-10 mb-6 custom-black">
            Hi, {session.user.name ? session.user.name : "User"}
          </h1>
          {isLoading ? (
            <div className="min-h-[600px]">Loading...</div>
          ) : (
            <>
              <h2 className="text-xl mt-10 mb-5">Enrollments</h2>
              {/* Show all my enrollments */}
              {data && data.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {data.map((enrollment, index) => (
                    <div
                      key={index}
                      className="bg-slate-200 rounded-lg mb-4 p-3"
                    >
                      <div className="flex justify-between mb-3">
                        <span>{index+1}.</span>
                        <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"><circle cx="12" cy="13" r="8"/><path d="M5 3L2 6m20 0l-3-3M6.38 18.7L4 21m13.64-2.33L20 21M9 13l2 2l4-4"/></g></svg>
                          {format(new Date(enrollment.date), "PPpp")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <h3 className="text-md font-semibold">
                          {enrollment.course.title}
                        </h3>
                        <span>${enrollment.course.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="min-h-[600px] flex items-center justify-center">
                  <p className="text-gray-500">
                    You have not enrolled in any course yet.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
