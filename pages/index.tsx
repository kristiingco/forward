import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forward</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className="my-6">
        <Search />
        <SectionCards title="Trending" trending={true} />
        <SectionCards title="Recommended for you" trending={false} />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
