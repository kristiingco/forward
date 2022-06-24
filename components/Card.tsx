import { FunctionComponent, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/user-context";

type CardProps = {
  videoId: string;
  title: string;
  year: number;
  category: string;
  rating: string;
  inTrendingSection: boolean;
  isBookmarked: boolean;
  imgUrl: string;
};

const Card: FunctionComponent<CardProps> = ({
  videoId,
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

  const { currentUser } = useContext(UserContext);

  const handleClickBookmark = async () => {
    if (currentUser) {
      const { uid } = currentUser;
      const data = await fetch(
        `/api/modify-bookmark?userId=${uid}&videoId=${videoId}`,
        { method: "POST" }
      ).then(async (res) => {
        const data = await res.json();
        return data.bookmark.isBookmarked;
      });

      router.reload();
    }
  };
  return (
    <div
      className={`flex flex-col relative rounded-md ${
        !inTrendingSection ? "mb-8" : ""
      }`}
    >
      <div
        className={`group flex items-center justify-center absolute z-50 w-6 h-6 bg-black/75 rounded-full m-1 ${
          inTrendingSection
            ? "left-64 md:left-72 lg:left-96 lg:-mx-8"
            : "left-32 md:left-52 lg:left-64"
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
      <div
        className={`group ${
          inTrendingSection ? "w-72 md:w-80 lg:w-96" : "w-40 md:w-60 lg:w-72"
        }`}
      >
        <div
          className={`absolute bg-black/40 z-30 flex flex-1 justify-center items-center w-full opacity-0 group-hover:opacity-100 box-content pb-1 md:py-1 lg:py-3 ${
            inTrendingSection ? "h-full" : "h-24 md:h-36 lg:h-40"
          }`}
        >
          <div className="flex items-center bg-white/30 py-2 px-3 space-x-3 rounded-full cursor-pointer">
            <Image
              src={`/static/icon-play.svg`}
              alt="Play"
              width="30px"
              height="30px"
            />
            <span className="">Play</span>
          </div>
        </div>
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
            ? "absolute p-6 md:py-9 lg:py-14 top-20 w-72 md:w-80 lg:w-96 bg-gradient-to-b from-transparent to-black rounded-b-lg"
            : ""
        }
      >
        <span
          className={`font-light opacity-80  ${
            inTrendingSection ? "text-md" : "text-sm md:text-md lg:text-lg"
          }`}
        >
          {year} &#8226;{" "}
          <Image
            src={
              category === "Movie"
                ? "/static/icon-category-movie.svg"
                : "/static/icon-category-tv.svg"
            }
            alt="Insert Movie Title Here"
            width={inTrendingSection ? "16px" : "14px"}
            height={inTrendingSection ? "16px" : "14px"}
            className=""
          />{" "}
          {category} &#8226; {rating}
        </span>
        <p
          className={`${
            inTrendingSection ? "text-lg" : "text-sm"
          }  md:text-xl lg:text-2xl`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default Card;
