import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

import entertainmentData from "../lib/data.json";
import search from "../lib/utils/search";

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allFilteredVideos: any[] = search(entertainmentData, searchQuery);
  const trendingVideos: any[] = entertainmentData.filter((element) => {
    return element.isTrending;
  });
  const nonTrendingVideos: any[] = entertainmentData.filter((element) => {
    return !element.isTrending;
  });
  return (
    <div>
      <Head>
        <title>Forward</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className="my-6">
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
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
