import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import { useState } from "react";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";
import { motion } from "framer-motion";

import entertainmentData from "../lib/data.json";
import search from "../lib/utils/search";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

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
      <motion.main
        className="my-6"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "linear" }}
      >
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
      </motion.main>
    </div>
  );
};

export default Bookmarks;
