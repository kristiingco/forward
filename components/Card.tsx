import { FunctionComponent } from "react";
import Image from "next/image";

type CardProps = {
  trending: boolean;
};

const Card: FunctionComponent<CardProps> = ({ trending }: CardProps) => {
  return (
    <div className="flex flex-col relative rounded-md">
      <div
        className={`flex items-center justify-center absolute z-50 w-6 h-6 bg-black rounded-full m-1 ${
          trending ? "left-64" : "left-32"
        }`}
      >
        <Image
          src="/static/icon-bookmark-empty.svg"
          alt="Insert Title then Bookmark here"
          width="10px"
          height="12px"
        />
      </div>
      <div className={`${trending ? "w-72" : "w-40"}`}>
        <Image
          src="https://pbs.twimg.com/media/EMxsvAsU8AIVfO0.jpg"
          alt="Insert Movie Title Here"
          width={280}
          height={174}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div
        className={
          trending
            ? "absolute p-6 top-20 w-72 bg-gradient-to-b from-transparent to-black rounded-b-lg"
            : ""
        }
      >
        <span
          className={`font-light ${
            trending ? "text-md" : "opacity-50 text-sm"
          }`}
        >
          Year &#8226; Category &#8226; Rating
        </span>
        <p className="text-lg">Title</p>
      </div>
    </div>
  );
};

export default Card;
