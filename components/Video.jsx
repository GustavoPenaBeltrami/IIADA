"use client";
import React, { useEffect, useRef, useState } from "react";
import playerjs from "player.js";

const Video = ({ videoUrl, onVideoEnded }) => {
  const [ended, setEnded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (ended) {
      return;
    }
    const player = new playerjs.Player(iframeRef.current);
    player.on("ended", () => {
      onVideoEnded(true);
      setEnded(true);
    });
  }, [onVideoEnded]);

  return (
    <div className="relative w-full pt-0 pb-[56.2%] max-h-fit rounded-xl overflow-hidden">
      <iframe
        ref={iframeRef}
        allow="fullscreen"
        allowFullScreen
        height="100%"
        src={videoUrl}
        width="100%"
        className="w-full h-full absolute top-0 left-0 overflow-hidden border-none rounded-xl"
      ></iframe>
    </div>
  );
};

export default Video;
