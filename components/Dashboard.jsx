"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

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
            setLoading(false);
            sessionStorage.setItem(
              "enrolled-courses",
              JSON.stringify(data.courses)
            );
          });
      } else {
        setData(JSON.parse(cachedEnrolledCourses));
        setLoading(false);
      }
    }
  }, [session]);

  if (data) {
    console.log(data);
  }

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
              {/* Show all my enrollments */}
              {data.length > 0 ? (
                <>
                {data.map((userCourse, index) => {
                  <>
                  {console.log(userCourse)}
                  </>
                })}
                </>
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
