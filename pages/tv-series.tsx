import { useState } from "react";
import type { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";
import { motion } from "framer-motion";

import search from "../lib/utils/search";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export async function getServerSideProps(context: any) {
  const baseUrl = context.req ? `http://${context.req.headers.host}` : "";

  const allVideos = await fetch(baseUrl + "/api/get-all-videos").then(
    async (res) => {
      const data = await res.json();
      return data.videos;
    }
  );

  const tvSeriesVideos = allVideos.filter((element: any) => {
    return element.category === "TV Series";
  });

  return {
    props: {
      tvSeriesVideos,
    },
  };
}

const TVSeries: NextPage<any> = ({
  tvSeriesVideos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTVSeriesVideos: any[] = search(tvSeriesVideos, searchQuery);

  return (
    <div className="lg:flex">
      <NavBar isActive="tv series" />
      <motion.main
        className="my-6 lg:w-screen lg:overflow-x-hidden"
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
