export default function DashboardPage() {

  const done = [
    {
      title: "Course 1: Example title",
      date: "2021-10-10",
      score: 80
    },
    {
      title: "Course 2: Another example title",
      date: "2021-10-10",
      score: 90
    },
    {
      title: "Course 3: The best course",
      date: "2021-10-10",
      score: 100
    },
    {
      title: "Course 4: The worst course",
      date: "2021-10-10",
      score: 30
    },
    {
      title: "Course 5: The average course",
      date: "2021-10-10",
      score: 70
    },
  ]

  const courses_purchased = [
    {
      title: "Course 1: Example title",
      date: "2021-10-10",
      price: 100,
      paymentType: "Visa ***1234"
    },
    {
      title: "Course 2: Another example title",
      date: "2021-10-10",
      price: 100,
      paymentType: "Visa ***1234"
    },
    {
      title: "Course 3: The best course",
      date: "2021-10-10",
      price: 100,
      paymentType: "Visa ***1234"
    },
    {
      title: "Course 4: The worst course",
      date: "2021-10-10",
      price: 100,
      paymentType: "Visa ***1234"
    },
    {
      title: "Course 5: The average course",
      date: "2021-10-10",
      price: 100,
      paymentType: "Visa ***1234"
    },
  ]

  return (
    <>
      <h1 className="text-4xl font-bold mt-10 custom-black mb-16"> Hi USER!</h1>

      <h2 className="text-2xl font-bold mt-10 custom-black mb-4">My grades</h2>
      <div className="block w-11/12 mx-auto">
        <div className="grid grid-cols-4 gap-4 border-b border-gray-300 py-4">
          <p className="text-lg font-bold col-span-2">Course</p>
          <p className="text-lg font-bold">Date</p>
          <p className="text-lg font-bold text-right">Score</p>
        </div>
        {done.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 border-b border-gray-300 py-4 ">
            <p className="text-lg col-span-2 text-[#005FAC]">{item.title}</p>
            <p className="text-lg">{item.date}</p>
            <p className="text-lg text-right">{item.score}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-16 custom-black mb-4">Purchase history</h2>
      <div className="block w-11/12 mx-auto">
        <div className="grid grid-cols-5 gap-4 border-b border-gray-300 py-4">
          <p className="text-lg font-bold col-span-2">Course</p>
          <p className="text-lg font-bold">Date</p>
          <p className="text-lg font-bold text-center">Price</p>
          <p className="text-lg font-bold text-right">Payment</p>
        </div>
        {courses_purchased.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 border-b border-gray-300 py-4 ">
            <p className="text-lg text-[#005FAC] col-span-2">{item.title}</p>
            <p className="text-lg">{item.date}</p>
            <p className="text-lg text-center">{item.price}</p>
            <p className="text-lg text-right">{item.paymentType}</p>
          </div>
        ))}
      </div>
    </>
  );
}
