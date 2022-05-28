import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

const TVSeries: NextPage = () => {
  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search />
        <SectionCards title="TV Series" trending={false} />
      </main>
    </div>
  );
};

export default TVSeries;
