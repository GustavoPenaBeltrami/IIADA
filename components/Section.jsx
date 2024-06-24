"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Video from "./Video";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Section = () => {
  const { courseId, sectionId } = useParams();
  const [session, setSession] = useState(null);
  const [course, setCourse] = useState(null);
  const [section, setSection] = useState(null);
  const [data, setData] = useState(null);
  const [nextSection, setNextSection] = useState(null);
  const [previousSection, setPreviousSection] = useState(null);
  const [isLoading, setLoading] = useState(true);

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
            const thisCourse = data.courses.find(
              (course) => course.course.id === courseId
            );
            if (!thisCourse) {
              router.push("/courses");
              return
            }
            sessionStorage.setItem(
              "enrolled-courses",
              JSON.stringify(data.courses)
            );
            setData(thisCourse);
            setCourse(thisCourse.course);
            setSection(
              thisCourse.userSectionProgress.find(
                (section) => section.id === sectionId
              )
            );
            setLoading(false);
          });
      } else {
        const cacheCourse = enrolledCourses.find(
          (course) => course.course.id === courseId
        );
        setData(cacheCourse);
        setCourse(cacheCourse.course);
        setSection(
          cacheCourse.userSectionProgress.find(
            (section) => section.id === sectionId
          )
        );
        setLoading(false);
      }
    }
  }, [session, courseId, sectionId]);

  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnded = (ended) => {
    setVideoEnded(ended);
  };

  useEffect(() => {
    if (videoEnded && section && section.finished === false) {
      fetch("/api/section", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sectionId: section.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            updateCache();
            toast.success("Section completed!");
          }
        })
        .catch((error) => {
          console.error("Error updating section progress:", error);
        });
    }
  }, [videoEnded]);

  const updateCache = () => {
    if (section && course) {
      const enrolledCourses = JSON.parse(
        sessionStorage.getItem("enrolled-courses")
      );
      if (!enrolledCourses) return;

      enrolledCourses.forEach((iterator) => {
        if (iterator.course && iterator.userSectionProgress) {
          iterator.userSectionProgress.forEach((progress) => {
            if (progress.id === section.id) {
              progress.finished = true;
            }
          });
        }
      });
      sessionStorage.setItem(
        "enrolled-courses",
        JSON.stringify(enrolledCourses)
      );

      setSection((prevSection) => ({ ...prevSection, finished: true }));
    }
  };

  if (data && section && !nextSection && !previousSection) {
    data.userSectionProgress.map((iteration) => {
      if (iteration.section.number === section.section.number + 1) {
        if (iteration.section.id) {
          setNextSection(iteration.id);
        } else {
          setNextSection(null);
        }
      }
      if (iteration.section.number === section.section.number - 1) {
        if (iteration.section.id) {
          setPreviousSection(iteration.id);
        } else {
          setPreviousSection(null);
        }
      }
    });
  }

  return (
    <>
      {isLoading && (
        <p className="h-full w-full flex justify-center items-center">
          Loading...
        </p>
      )}
      {course && section && !isLoading && (
        <div className="min-h-[80vh]">
          <Link
            className="text-slate-400 text-xl italic hover:text-slate-500"
            href={`/courses/${courseId}`}
          >
            Return
          </Link>
          <h2 className="text-xl font-semibold pt-6 pb-4 custom-text">
            {course.title}
          </h2>
          <Video
            videoUrl={section.section.videoUrl}
            onVideoEnded={handleVideoEnded}
          />
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-900 my-5">
              {section.section.title}
            </h1>

            {section.finished ? (
              <p className="bg-lime-700 text-white py-2 px-4 rounded-md">
                Complete
              </p>
            ) : (
              <p className="bg-red-700 text-white py-2 px-4 rounded-md">
                In progress
              </p>
            )}
          </div>
          <p className="text-slate-500 my-5 mb-7">
            {section.section.description}
          </p>
          <div className="w-full flex justify-between">
            {previousSection ? (
              <Link
                href={`/courses/${courseId}/${previousSection}`}
                className="special-button py-2 px-4 rounded-md duration-300 transition-all"
              >
                {"< Previous"}
              </Link>
            ) : (
              <div className="bg-custom text-white opacity-70 py-2 px-4 rounded-md duration-300 transition-all">
                {"< Previous"}
              </div>
            )}
            {nextSection ? (
              <Link
                href={`/courses/${courseId}/${nextSection}`}
                className="special-button py-2 px-4 rounded-md duration-300 transition-all"
              >
                {"Next >"}
              </Link>
            ) : (
              <div className="bg-custom text-white opacity-70 py-2 px-4 rounded-md duration-300 transition-all">
                {"Next >"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
