"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/dogLogo.png";
import { useState } from "react";

export default function NavBar() {
  const pathName = usePathname();
  const [menuStatus, setMenuStatus] = useState(false);
  function handleToggleMenu() {
    setMenuStatus(!menuStatus);
  }
  return (
    <nav className="nav">
      <div className="responsive">
        <div className="logo">
          <Image src={logo} alt="dog logo with collar" />
        </div>
        <div className="menu" onClick={handleToggleMenu}>
          <div className="menu__item"></div>
          <div className="menu__item"></div>
          <div className="menu__item"></div>
        </div>
      </div>
      <ul className={`links ${menuStatus ? "menu-active" : "menu-hidden"}`}>
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
