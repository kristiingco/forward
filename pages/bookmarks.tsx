import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";

import entertainmentData from "../lib/data.json";

const Bookmarks: NextPage = () => {
  return (
    <div>
      <NavBar />
      <main className="my-6">
        <Search placeholderText="Search for bookmarked shows" />
        <SectionCards
          title="Bookmarked Movies"
          trending={false}
          videos={entertainmentData.filter((element) => {
            return element.category === "Movie" && element.isBookmarked;
          })}
        />
        <SectionCards
          title="Bookmarked TV Series"
          trending={false}
          videos={entertainmentData.filter((element) => {
            return (
              element.category === "TV Series" && element.isBookmarked === true
            );
          })}
        />
      </main>
    </div>
  );
};

export default Bookmarks;
