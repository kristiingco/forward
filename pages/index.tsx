import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Search from "../components/Search";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forward</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className="px-4 py-6">
        <Search />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
