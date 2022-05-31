import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

import entertainmentData from "../lib/data.json";

const Movies: NextPage = () => {
  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search placeholderText="Search for movies" />
        <SectionCards
          title="Movies"
          trending={false}
          videos={entertainmentData.filter((element) => {
            return element.category === "Movie";
          })}
        />
      </main>
    </div>
  );
};

export default Movies;
