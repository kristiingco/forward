import { useState } from "react";
import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

import entertainmentData from "../lib/data.json";
import search from "../lib/utils/search";

const TVSeries: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTVSeriesVideos: any[] = search(
    entertainmentData.filter((element) => {
      return element.category === "TV Series";
    }),
    searchQuery
  );

  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search
          placeholderText="Search for TV series"
          setSearchQuery={setSearchQuery}
        />
        <SectionCards
          title={
            searchQuery
              ? `Found ${filteredTVSeriesVideos.length} ${
                  filteredTVSeriesVideos.length === 1 ? "result" : "results"
                } for '${searchQuery}'`
              : "TV series"
          }
          trending={false}
          videos={filteredTVSeriesVideos}
        />
      </main>
    </div>
  );
};

export default TVSeries;
