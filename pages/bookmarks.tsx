import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

const Bookmarks: NextPage = () => {
  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search />
        <SectionCards title="Bookmarked Movies" trending={false} />
        <SectionCards title="Bookmarked TV Series" trending={false} />
      </main>
    </div>
  );
};

export default Bookmarks;
