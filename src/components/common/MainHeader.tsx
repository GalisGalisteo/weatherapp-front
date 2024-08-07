import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/logo.png";

export default function MainHeader() {
  return (
    <header>
      <Link href="/">
        <Image
          src={logoImg}
          height={120}
          alt="Logo"
          className="mx-auto"
          priority
        />
      </Link>
    </header>
  );
}
