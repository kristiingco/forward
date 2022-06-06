import { FunctionComponent } from "react";
import Card from "./Card";

type SectionCardsProps = {
  title: string;
  trending: boolean;
  videos: any[];
};

const SectionCards: FunctionComponent<SectionCardsProps> = ({
  title,
  trending,
  videos,
}: SectionCardsProps) => {
  return (
    <section className={`my-4 ${!trending ? "mx-4" : ""}`}>
      <h2 className={`${trending ? "mx-4" : ""} text-xl font-light`}>
        {title}
      </h2>
      <div
        className={`my-4 ${
          trending
            ? "flex overflow-x-auto overflow-y-hidden gap-4 p-4"
            : "flex flex-wrap justify-between"
        }`}
      >
        {videos.map((video, index) => {
          return (
            <Card
              key={index}
              title={video.title}
              year={video.year}
              category={video.category}
              rating={video.rating}
              inTrendingSection={trending}
              isBookmarked={video.isBookmarked}
              imgUrl={video.thumbnail}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
