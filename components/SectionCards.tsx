import { FunctionComponent } from "react";
import Card from "./Card";

type SectionCardsProps = {
  title: string;
  trending: boolean;
};

const SectionCards: FunctionComponent<SectionCardsProps> = ({
  title,
  trending,
}: SectionCardsProps) => {
  return (
    <div className={`my-4 ${trending ? "ml-4" : "mx-4"}`}>
      <h2 className="text-xl font-light">{title}</h2>
      <div
        className={`my-4 ${
          trending
            ? "flex overflow-x-auto overflow-y-hidden gap-4"
            : "flex flex-wrap justify-between"
        }`}
      >
        <Card trending={trending} />
        <Card trending={trending} />
        <Card trending={trending} />
      </div>
    </div>
  );
};

export default SectionCards;
