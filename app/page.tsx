import Image from "next/image";
import UploadResume from "@/components/UploadResume";

export default function Home() {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center">
      <UploadResume />


    </div>
  );
}
