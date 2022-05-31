import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

import entertainmentData from "../lib/data.json";

const TVSeries: NextPage = () => {
  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search placeholderText="Search for TV series" />
        <SectionCards
          title="TV Series"
          trending={false}
          videos={entertainmentData.filter((element) => {
            return element.category === "TV Series";
          })}
        />
      </main>
    </div>
  );
};

export default TVSeries;
