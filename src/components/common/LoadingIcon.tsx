import loadingIcon from "@/assets/loading.svg";
import Image from "next/image";

export default function LoadingIcon() {
  return (
    <Image
      className="animate-ping"
      src={loadingIcon}
      alt="Loading..."
      width={100}
      height={100}
    />
  );
}
