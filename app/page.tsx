import Image from "next/image";
import UploadResume from "@/components/UploadResume";
import Rating from "@/components/Rating";
import ResultsTags from "@/components/ResultsTags";
import UpdatedCv from "@/components/UpdatedCv";

import { FcRating } from "react-icons/fc";

export default function Home() {
  return (
    <div className="w-full min-h-[65vh] flex flex-col justify-center ">
      <UploadResume />

      <Rating />

      <ResultsTags />

      <UpdatedCv />

    </div>
  );
}
