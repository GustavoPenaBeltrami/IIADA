import Link from "next/link";

export default function Test() {
  return (
    <div className="min-h-[80vh]">
      <h1 className="text-xl font-semibold pt-10 pb-4 custom-text">Example Course</h1>
      <video controls width="100%" className="pb-10">
        <source src="/video.mp4" type="video/mp4"></source>
      </video>
      <div className="flex flex-row justify-between items-center mb-5">
        <h2 className="text-4xl font-bold pb-5">Class n°1: First Class of the course</h2>
        <div className="flex flex-row justify-end -translate-y-2">
          <label className="cursor-pointer bg-custom text-white p-2 rounded-lg duration-300 transition-all hover:bg-slate-500">
            <input type="checkbox" />
            <span className="ml-2">Mark as complete</span>
          </label>
        </div>
      </div>
      <p className="text-lg pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui. In vitae turpis massa sed elementum tempus egestas sed sed. Mauris a diam maecenas sed enim. Vestibulum lorem sed risus ultricies tristique nulla. Nunc sed velit dignissim sodales ut. Lacus sed turpis tincidunt id aliquet risus feugiat. Massa eget egestas purus viverra accumsan. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Odio ut sem nulla pharetra. Pellentesque pulvinar pellentesque habitant morbi tristique. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Euismod lacinia at quis risus sed vulputate odio. Ornare lectus sit amet est placerat in. Fermentum et sollicitudin ac orci phasellus egestas tellus.</p>
      <div className="flex flex-row justify-between items-center py-5">
        <Link href="/courses" className="login-button p-2 rounded-lg duration-300 transition-all">{`< Previous`}</Link>
        <Link href="/exam-test" className="login-button p-2 rounded-lg duration-300 transition-all">{`Next >`}</Link>
      </div>
    </div>
  );
}
