import Link from "next/link";

export default function AboutUsPage() {
  return (
    <>
      <h1 className="text-4xl text-center font-bold mt-10 custom-black mb-16"> About Us title</h1>
      <div className="flex flex-col gap-y-6 lg:mb-56">

        <p className="custom-black">
          IIADA is the only trade association in Indiana representing the independent used car dealer. IIADA is recognized throughout Indiana as the official voice of the used car dealer.  The Association has an established record of accomplishment and fair dealing.
        </p>
        <p className="custom-black">Important news and information about the automobile industry is mailed to our members through the IIADA Car Lines magazine and the Used Car Dealer national magazine. These publications will keep you informed on issues affecting your business income.</p>
        <p className="custom-black">IIADA is nothing new. It was established in 1987 to represent used car dealers in Indiana. IIADA has a presence before the State Legislature and becomes involved with the state regulatory agencies whenever necessary.</p>
        <p className="custom-black">IIADA proudly includes in its membership dealers of all sizes, from the largest to the smallest. Its strength is in the devotion of its individual members. Therefore, whether your business is large or small, you are urged to join this progressive association, an association dedicated to serving you, the independent used car dealer.</p>
        <Link href="https://www.indianaiada.com/af_about_us" target="_blank" className="w-fit mx-auto block mt-10 blue-bg p-4 px-6 rounded-xl special-button text-white font-normal text-xl transition-all duration-300">More info</Link>
      </div>

    </>
  );
}
