import { FunctionComponent, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOutUser } from "../lib/firebase";
import { UserContext } from "../contexts/user-context";

type NavBarProps = {
  isActive: string;
};

const NavBar: FunctionComponent<NavBarProps> = ({ isActive }: NavBarProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentUser } = useContext(UserContext);
  return (
    <nav className="flex justify-between items-center bg-semi-dark-blue px-3 py-3.5 md:m-5 md:rounded-xl lg:flex-col lg:justify-start lg:h-screen lg:space-y-8">
      <div>
        <Image
          src={"/static/logo.svg"}
          alt="Forward Logo"
          width="25px"
          height="20px"
        />
      </div>

      <div className="flex lg:flex-col gap-x-5 lg:gap-y-5">
        <Link href="/">
          <a>
            <Image
              src={`/static/icon-nav-home${
                isActive === "home" ? "-full" : ""
              }.svg`}
              alt="Home Nav Icon"
              width="16px"
              height="16px"
            />
          </a>
        </Link>
        <Link href="/movies">
          <a>
            <Image
              src={`/static/icon-nav-movies${
                isActive === "movies" ? "-full" : ""
              }.svg`}
              alt="Movie Nav Icon"
              width="16px"
              height="16px"
            />
          </a>
        </Link>
        <Link href="/tv-series">
          <a>
            <Image
              src={`/static/icon-nav-tv-series${
                isActive === "tv series" ? "-full" : ""
              }.svg`}
              alt="TV Series Nav Icon"
              width="16px"
              height="16px"
            />
          </a>
        </Link>
        <Link href="/bookmarks">
          <a>
            <Image
              src={`/static/icon-nav-bookmark${
                isActive === "bookmarks" ? "-full" : ""
              }.svg`}
              alt="Bookmark Nav Icon"
              width="16px"
              height="16px"
            />
          </a>
        </Link>
      </div>

      <div className="lg:flex lg:flex-col lg:justify-end lg:h-screen">
        <div className="flex border-2 rounded-full ">
          <Image
            src={"/static/image-avatar.svg"}
            alt="User Avatar"
            width={30}
            height={30}
            objectFit="cover"
            className="cursor-pointer rounded-full"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          />
        </div>
        {toggleMenu && (
          <div className="absolute bg-black font-light text-sm right-0 p-3 mt-1 lg:left-2 lg:-bottom-16 lg:w-fit lg:z-10">
            {currentUser && (
              <span className="block border-b-2">
                Hello, {currentUser.email}!
              </span>
            )}

            <span className="cursor-pointer" onClick={signOutUser}>
              Sign Out
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
