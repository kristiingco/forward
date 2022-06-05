import { useState } from "react";
import type { NextPage } from "next";
import NavBar from "../components/NavBar";
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
      <motion.main
        className="my-6"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "linear" }}
      >
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
      </motion.main>
    </div>
  );
};

export default Movies;
