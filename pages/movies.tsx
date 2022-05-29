import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

const Movies: NextPage = () => {
  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search placeholderText="Search for movies" />
        <SectionCards title="Movies" trending={false} />
      </main>
    </div>
  );
};

export default Movies;
