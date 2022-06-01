import { useState } from "react";
import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

import entertainmentData from "../lib/data.json";
import search from "../lib/utils/search";

const Movies: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMovieVideos: any[] = search(
    entertainmentData.filter((element) => {
      return element.category === "Movie";
    }),
    searchQuery
  );
  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search
          placeholderText="Search for movies"
          setSearchQuery={setSearchQuery}
        />
        <SectionCards
          title={
            searchQuery
              ? `Found ${filteredMovieVideos.length} ${
                  filteredMovieVideos.length === 1 ? "result" : "results"
                } for '${searchQuery}'`
              : "Movies"
          }
          trending={false}
          videos={filteredMovieVideos}
        />
      </main>
    </div>
  );
};

export default Movies;
