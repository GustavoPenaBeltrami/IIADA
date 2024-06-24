import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const GenerateCertificate = () => {
  const pdfRef = useRef();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const cacheUser = sessionStorage.getItem("session");

    if (!cacheUser) {
      fetch("/api/auth/")
        .then((res) => res.json())
        .then((data) => {
          setSession(data.session);
          sessionStorage.setItem("session", JSON.stringify(data.session));
        });
    } else {
      setSession(JSON.parse(cacheUser));
    }
  }, []);

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape", // Considera si 'portrait' sería más adecuado dependiendo de tu contenido
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("certificate.pdf");
    });
  };

  return (
    <>
      <div className="border-stone-400 border m-4 py-10">
        <div ref={pdfRef} className="w-full h-full px-10 py-0  times-new-roman">
          <h2 className="text-center w-full text-4xl">
            Operating as a Dealer with Integrity & Professionalism <br /> The
            Indiana Independent Automobile Dealer Association <br /> Proudly
            Presents:
          </h2>
          {session ? (
            <div className="text-center  my-8">
              <p className="text-center text-4xl italic">
                {session.user.name} {session.user.lastName}
              </p>
              <span className="text-sm text-stone-300 my-0 leading-3">
                {session.user.id}
              </span>
            </div>
          ) : (
            <p className="text-center text-4xl italic my-8">PLACEHOLDER</p>
          )}
          <p className="text-center text-xl pb-4">2024 IIADA Dealer Member</p>
          <img src="/certificate-footer.png" className="w-full" />
        </div>
      </div>
      <button onClick={downloadPDF}>DOWNLOAD</button>
    </>
  );
};
