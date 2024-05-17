import Link from "next/link";

export default function Test() {
  return (
    <div className="min-h-[80vh]">
      <h1 className="text-xl font-semibold pt-10 pb-4 custom-text">Example Exam</h1>
      <h2 className="text-4xl font-bold pb-5">Exam: Example course</h2>
      <h3 className="text-2xl font-bold py-5">1. Example question number 1?</h3>
      <p className="text-lg pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui. In vitae turpis massa sed elementum tempus egestas sed sed. Mauris a diam maecenas sed enim. Vestibulum lorem sed risus ultricies tristique nulla.</p>
      <form className="grid grid-cols-1 justify-center items-center pl-5">
        <label className="cursor-pointer flex flex-row justify-center my-5 w-fit">
          <input type="radio" name="answer" value="1" />
          <span className="ml-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        </label>
        <label className="cursor-pointer flex flex-row justify-center my-5 w-fit">
          <input type="radio" name="answer" value="2" />
          <span className="ml-2">Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
        <label className="cursor-pointer flex flex-row justify-center my-5 w-fit">
          <input type="radio" name="answer" value="3" />
          <span className="ml-2">Lorem ipsum dolor sit amet, consectetur adipiscing.</span>
        </label>
        <label className="cursor-pointer flex flex-row justify-center my-5 w-fit">
          <input type="radio" name="answer" value="4" />
          <span className="ml-2">Lorem ipsum dolor sit amet.</span>
        </label>
      </form>
      <div className="flex flex-row justify-between items-center py-5">
        <Link href="/courses" className="login-button p-2 rounded-lg duration-300 transition-all">{`< Previous`}</Link>
        <Link href="/exam-test" className="login-button p-2 rounded-lg duration-300 transition-all">{`Next >`}</Link>
      </div>
    </div>
  );
}
