import { FunctionComponent } from "react";
import Image from "next/image";

const Search: FunctionComponent<{}> = () => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <div className="px-3 py-3">
        <Image
          src={"/static/icon-search.svg"}
          alt="Forward Logo"
          width="32px"
          height="32px"
        />
      </div>
      <input
        type="text"
        placeholder="Search for movies or TV series"
        className="bg-transparent text-lg font-light py-3 mr-4 focus:border-b-2 focus:outline-0 focus:border-b-grayish-blue w-full"
      />
    </div>
  );
};

export default Search;