import { FunctionComponent } from "react";
import Image from "next/image";

type SearchProps = {
  placeholderText: string;
  setSearchQuery: any;
};

const Search: FunctionComponent<SearchProps> = ({
  placeholderText,
  setSearchQuery,
}: SearchProps) => {
  const onSearchChangeHandler = (e: any) => {
    setSearchQuery(e.target.value);
  };
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
        placeholder={placeholderText}
        className="bg-transparent text-lg font-light py-3 mr-4 focus:border-b-2 focus:outline-0 focus:border-b-grayish-blue w-full caret-bright-red"
        onChange={onSearchChangeHandler}
      />
    </div>
  );
};

export default Search;
