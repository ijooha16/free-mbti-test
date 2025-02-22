import linkIcon from "../assets/line-md_link.png";
import { toast } from "react-toastify";

const SareBtn = () => {
  const shareHandler = async () => {
    try {
      await navigator.share(shareData);
      toast.success("공유 성공!");
    } catch (error) {
      toast.error("공유 실패..");
      console.log(error);
    }
  };

  const shareData = {
    title: "MBTI TEST",
    text: "내 성격 유형을 알아보자!",
    url: "https://free-mbti-test-aw11n78r9-juha-yoons-projects.vercel.app",
  };

  return (
    <button
      type="button"
      onClick={shareHandler}
      className="bg-lightgray rounded-full w-[40px] h-[40px] flex justify-center items-center"
    >
      <img src={linkIcon} alt="share" className="w-4/5 h-4/5 object-contain" />
    </button>
  );
};

export default SareBtn;
