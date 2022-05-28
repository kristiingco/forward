import { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar: FunctionComponent<{}> = () => {
  return (
    <nav className="flex justify-between items-center bg-semi-dark-blue px-3 py-3.5 ">
      <div>
        <Image
          src={"/static/logo.svg"}
          alt="Forward Logo"
          width="25px"
          height="20px"
        />
      </div>

      <div className="flex self-center gap-x-5">
        <Link href="/">
          <a>
            <Image
              src={"/static/icon-nav-home.svg"}
              alt="Home Nav Icon"
              width="16px"
              height="16px"
            />
          </a>
        </Link>
        <Link href="/movies">
          <a>
            <Image
              src={"/static/icon-nav-movies.svg"}
              alt="Movie Nav Icon"
              width="16px"
              height="16px"
            />
          </a>
        </Link>
        <Link href="/tv-series">
          <a>
            <Image
              src={"/static/icon-nav-tv-series.svg"}
              alt="TV Series Nav Icon"
              width="16px"
              height="16px"
            />
          </a>
        </Link>
        <Link href="/bookmarks">
          <a>
            <Image
              src={"/static/icon-nav-bookmark.svg"}
              alt="Bookmark Nav Icon"
              width="16px"
              height="16px"
            />
          </a>
        </Link>
      </div>

      <div className="flex border-2 rounded-full">
        <Image
          src={"/static/image-avatar.png"}
          alt="User Avatar"
          width="30px"
          height="30px"
        />
      </div>
    </nav>
  );
};

export default NavBar;
