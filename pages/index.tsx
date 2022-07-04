import { useState } from "react";
import type { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
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

  let allVideos = await fetch(baseUrl + "/api/get-all-videos").then(
    async (res) => {
      const data = await res.json();
      return data.videos;
    }
  );

  const trendingVideos = allVideos.filter((element: any) => {
    return element.isTrending;
  });

  const nonTrendingVideos: any[] = allVideos.filter((element: any) => {
    return !element.isTrending;
  });

  return {
    props: {
      allVideos,
      trendingVideos,
      nonTrendingVideos,
    },
  };
}

const Home: NextPage<any> = ({
  allVideos,
  trendingVideos,
  nonTrendingVideos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allFilteredVideos: any[] = search(allVideos, searchQuery);

  return (
    <div className="lg:flex">
      <Head>
        <title>Forward</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar isActive="home" />
      <motion.main
        className="my-6 lg:w-screen lg:overflow-x-hidden"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "linear" }}
      >
        <Search
          placeholderText="Search for movies or TV series"
          setSearchQuery={setSearchQuery}
        />
        {searchQuery ? (
          <SectionCards
            title={`Found ${allFilteredVideos.length} ${
              allFilteredVideos.length === 1 ? "result" : "results"
            } for '${searchQuery}'`}
            trending={false}
            videos={allFilteredVideos}
          />
        ) : (
          <>
            <SectionCards
              title="Trending"
              trending={true}
              videos={trendingVideos}
            />
            <SectionCards
              title="Recommended for you"
              trending={false}
              videos={nonTrendingVideos}
            />
          </>
        )}
      </motion.main>

      <footer></footer>
    </div>
  );
};

export default Home;
