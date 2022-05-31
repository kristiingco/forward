import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

import entertainmentData from "../lib/data.json";

const Home: NextPage = () => {
  console.log(entertainmentData);
  return (
    <div>
      <Head>
        <title>Forward</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className="my-6">
        <Search placeholderText="Search for movies or TV series" />
        <SectionCards
          title="Trending"
          trending={true}
          videos={entertainmentData.filter((element) => {
            return element.isTrending;
          })}
        />
        <SectionCards
          title="Recommended for you"
          trending={false}
          videos={entertainmentData.filter((element) => {
            return !element.isTrending;
          })}
        />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
