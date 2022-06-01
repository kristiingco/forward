import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import { useState } from "react";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

import entertainmentData from "../lib/data.json";
import search from "../lib/utils/search";

const Bookmarks: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allFilteredBookmarkedVideos: any[] = search(
    entertainmentData.filter((element) => {
      return element.isBookmarked;
    }),
    searchQuery
  );
  const allBookmarkedMovieVideos: any[] = entertainmentData.filter(
    (element) => {
      return element.category === "Movie" && element.isBookmarked;
    }
  );
  const allBookmarkedTVSeriesVideos: any[] = entertainmentData.filter(
    (element) => {
      return element.category === "TV Series" && element.isBookmarked === true;
    }
  );
  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search
          placeholderText="Search for bookmarked shows"
          setSearchQuery={setSearchQuery}
        />
        {searchQuery ? (
          <div>
            <SectionCards
              title={`Found ${allFilteredBookmarkedVideos.length} ${
                allFilteredBookmarkedVideos.length === 1 ? "result" : "results"
              } for '${searchQuery}'`}
              trending={false}
              videos={allFilteredBookmarkedVideos}
            />
          </div>
        ) : (
          <>
            <SectionCards
              title="Bookmarked Movies"
              trending={false}
              videos={allBookmarkedMovieVideos}
            />
            <SectionCards
              title="Bookmarked TV Series"
              trending={false}
              videos={allBookmarkedTVSeriesVideos}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Bookmarks;
