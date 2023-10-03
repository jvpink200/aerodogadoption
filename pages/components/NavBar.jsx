"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/dogLogo.png";

export default function NavBar() {
  const pathName = usePathname();
  return (
    <nav className="nav">
      <div className="logo">
        <Image src={logo} alt="dog logo with collar" />
      </div>
      <ul className="links">
        <li>
          <Link className={`${pathName === "/" ? "active" : "non"}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${pathName === "/results" ? "active" : "non"}`}
            href="/results"
          >
            Adoptable Dogs
          </Link>
        </li>
      </ul>
    </nav>
  );
}
