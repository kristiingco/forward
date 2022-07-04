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

  const allBookmarkedVideos = allVideos.filter((element: any) => {
    return element.isBookmarked;
  });

  const allBookmarkedMovieVideos: any[] = allBookmarkedVideos.filter(
    (element: any) => {
      return element.category === "Movie";
    }
  );
  const allBookmarkedTVSeriesVideos: any[] = allBookmarkedVideos.filter(
    (element: any) => {
      return element.category === "TV Series";
    }
  );

  return {
    props: {
      allBookmarkedVideos,
      allBookmarkedMovieVideos,
      allBookmarkedTVSeriesVideos,
    },
  };
}

const Bookmarks: NextPage<any> = ({
  allBookmarkedVideos,
  allBookmarkedMovieVideos,
  allBookmarkedTVSeriesVideos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allFilteredBookmarkedVideos: any[] = search(
    allBookmarkedVideos,
    searchQuery
  );

  return (
    <div className="lg:flex">
      <NavBar isActive="bookmarks" />
      <motion.main
        className="my-6 lg:w-screen lg:overflow-x-hidden"
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
            {allBookmarkedMovieVideos.length > 0 && (
              <SectionCards
                title="Bookmarked Movies"
                trending={false}
                videos={allBookmarkedMovieVideos}
              />
            )}
            {allBookmarkedTVSeriesVideos.length > 0 && (
              <SectionCards
                title="Bookmarked TV Series"
                trending={false}
                videos={allBookmarkedTVSeriesVideos}
              />
            )}
          </>
        )}
      </motion.main>
    </div>
  );
};

export default Bookmarks;
