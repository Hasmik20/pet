import Image from "next/image";
import Link from "next/link";

import logo from "../public/accets/homelogo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
