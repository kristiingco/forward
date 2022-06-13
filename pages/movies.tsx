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

  const movieVideos = allVideos.filter((element: any) => {
    return element.category === "Movie";
  });

  return {
    props: {
      movieVideos,
    },
  };
}

const Movies: NextPage<any> = ({
  movieVideos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMovieVideos: any[] = search(movieVideos, searchQuery);
  return (
    <div className="lg:flex">
      <NavBar />
      <motion.main
        className="my-6 lg:w-screen lg:overflow-x-hidden"
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
