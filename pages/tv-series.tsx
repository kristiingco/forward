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
      <motion.main
        className="my-6"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "linear" }}
      >
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
      </motion.main>
    </div>
  );
};

export default TVSeries;
