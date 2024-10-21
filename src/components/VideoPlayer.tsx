import { useState } from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  src: string;
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div className="w-[100%] h-[100%] rounded-[30px] overflow-hidden mt-[40px] relative pt-[56.25%]">
      <ReactPlayer
        url={src}
        width="100%"
        height="100%"
        controls={false}
        playing={playing}
        volume={0.5}
        light
        className="absolute top-0 left-0"
      />

      {!playing && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
          onClick={handlePlayPause}
        >
          <img
            src="/img/icons/subtract.svg"
            alt="Play"
            width={80}
            height={80}
          />
        </div>
      )}
    </div>
  );
}
