"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export const CatalogGrid = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // Nuevo estado para controlar la petición

  useEffect(() => {
    const cachedCourses = sessionStorage.getItem("all-courses");

    if (!cachedCourses && !hasFetched) {
      fetch(`/api/catalog`)
        .then((res) => res.json())
        .then((data) => {
          setData(data.courses);
          setLoading(false);
          sessionStorage.setItem("all-courses", JSON.stringify(data.courses));
          setHasFetched(true); // Actualiza el estado para evitar futuras peticiones
        });
    } else if (cachedCourses) {
      setData(JSON.parse(cachedCourses));
      setLoading(false);
    }
  }, [hasFetched]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 mt-20 pb-20 gap-4">
      {isLoading ? (
        <p className="h-full w-full flex justify-center items-center">
          Loading...
        </p>
      ) : (
        data &&
        data.map(
          (
            course,
            index // Changed from 'courses' to 'data' based on your state variable
          ) => (
            <Link
              href={{
                pathname: `/catalog/${course.id}`,
                query: { courseId: course.id },
              }}
              className="border border-solid border-zinc-400 hover:bg-slate-100 transition-all duration-300 cursor-pointer"
              key={course.id} // Use course ID as key
            >
              <span className="bg-custom text-white text-right w-full block h-2"></span>
              <img
                src={course.imageUrl || "/placeholder.webp"}
                className="min-h-32 pb-4"
                alt={course.title}
              />
              <h2 className="font-bold text-lg pl-2 custom-black">
                {course.title}
              </h2>
              <p className="text-zinc-400 italic p-1 line-clamp-3">
                {course.description}
              </p>
              <div className="w-full flex flex-row justify-end p-3 pt-5">
                <span className="font-bold text-white bg-custom p-1 px-2 rounded-lg">
                  ${course.price}
                </span>
              </div>
            </Link>
          )
        )
      )}
    </div>
  );
};
