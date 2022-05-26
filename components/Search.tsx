import Image from "next/image";
import { FunctionComponent } from "react";

const Search: FunctionComponent<{}> = () => {
  return (
    <div className="w-full flex items-center gap-x-5">
      <div className="py-3">
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
        className="bg-transparent w-full text-lg font-light py-3 focus:border-b-2 focus:outline-0 focus:border-b-grayish-blue"
      />
    </div>
  );
};

export default Search;
