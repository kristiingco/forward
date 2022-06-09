import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type CardProps = {
  title: string;
  year: number;
  category: string;
  rating: string;
  inTrendingSection: boolean;
  isBookmarked: boolean;
  imgUrl: string;
};

const Card: FunctionComponent<CardProps> = ({
  title,
  year,
  category,
  rating,
  inTrendingSection,
  isBookmarked,
  imgUrl,
}: CardProps) => {
  const router = useRouter();
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const handleClickBookmark = async () => {
    const data = await fetch("api/modify-bookmark", { method: "POST" }).then(
      async (res) => {
        const data = await res.json();
        return data.bookmark.isBookmarked;
      }
    );

    router.reload();
  };
  return (
    <div
      className={`flex flex-col relative rounded-md ${
        !inTrendingSection ? "mb-8" : ""
      }`}
    >
      <div
        className={`group flex items-center justify-center absolute z-50 w-6 h-6 bg-black rounded-full m-1 ${
          inTrendingSection ? "left-64" : "left-32"
        } hover:bg-white cursor-pointer`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClickBookmark}
      >
        <Image
          src={`/static/icon-bookmark-${
            isHovering || isBookmarked ? "full" : "empty"
          }.svg`}
          alt="Insert Title then Bookmark here"
          width="10px"
          height="12px"
        />
      </div>
      <div className={`${inTrendingSection ? "w-72" : "w-40"}`}>
        <Image
          src={imgUrl}
          alt={title}
          width={280}
          height={174}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div
        className={
          inTrendingSection
            ? "absolute p-6 top-20 w-72 bg-gradient-to-b from-transparent to-black rounded-b-lg"
            : ""
        }
      >
        <span
          className={`font-light opacity-80  ${
            inTrendingSection ? "text-md" : "text-sm"
          }`}
        >
          {year} &#8226;{" "}
          <Image
            src={"/static/icon-category-movie.svg"}
            alt="Insert Movie Title Here"
            width={inTrendingSection ? "12px" : "10px"}
            height={inTrendingSection ? "12px" : "10px"}
            className=""
          />{" "}
          {category} &#8226; {rating}
        </span>
        <p className={inTrendingSection ? "text-lg " : "text-sm"}>{title}</p>
      </div>
    </div>
  );
};

export default Card;
