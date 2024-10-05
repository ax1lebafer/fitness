import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer.tsx";
import ResultTraining from "../components/ResultTraining.tsx";

export default function MainTraining() {
  return (
    <div className="mb-[201px]">
      <h1 className="text-[60px] text-left">Йога</h1>
      <nav aria-label="breadcrumb">
        <ol className="flex flex-row text-[32px] font-normal pt-6">
          <li><Link to="#"><span className="underline">Красота и здоровье</span></Link></li>
          <li><Link to="#"><span className="underline">Йога на каждый день</span></Link></li>
          <li><Link to="#"><span className="underline">2 день</span></Link></li>
        </ol>
      </nav>
      <VideoPlayer/>
      <ResultTraining/>
    </div>
  );
}