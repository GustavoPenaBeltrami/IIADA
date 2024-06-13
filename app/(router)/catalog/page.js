import { CatalogGrid } from "@/components/CatalogGrid"; // Asumiendo que el componente está en la carpeta components

export default async function CoursesPage() {
  return (
    <>
      <h1 className="text-[38px] font-bold mt-10 mb-6 custom-black">ALL Courses</h1>
      <p className="custom-black">Welcome to our Courses section, your gateway to specialized automotive education. Whether you're a seasoned professional or just starting out, our carefully curated selection of courses covers a wide range of topics essential for success in the automotive industry. Browse our offerings below and embark on your journey towards excellence.</p>
      <CatalogGrid />
    </>
  );
}
