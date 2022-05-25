import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forward</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main>
        <h1>Kristi Ingco</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
