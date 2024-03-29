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
    <section className={`my-4 ${!trending ? "mx-5" : ""}`}>
      <h2
        className={`${
          trending ? "mx-4" : ""
        } text-xl md:text-2xl lg:text-3xl font-light flex flex-col`}
      >
        {title}
      </h2>
      <div
        className={`my-4 ${
          trending
            ? "flex overflow-x-auto overflow-y-hidden gap-4 p-4"
            : "flex flex-wrap justify-start gap-3 md:gap-6 lg:gap-10"
        }`}
      >
        {videos.map((video) => {
          return (
            <Card
              key={video.id}
              videoId={video.id}
              title={video.title}
              year={video.year}
              category={video.category}
              rating={video.rating}
              inTrendingSection={trending}
              imgUrl={video.thumbnail}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
