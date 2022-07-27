import { useState, useContext, useEffect } from "react";
import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import SectionCards from "../components/SectionCards";
import { motion } from "framer-motion";

import search from "../lib/utils/search";

import { getBookmarkedVideos } from "../lib/utils/videos";
import { UserContext } from "../contexts/user-context";
import useSWR, { mutate } from "swr";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Bookmarks: NextPage<any> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedVideos, setBookmarkedVideos] = useState<any>([]);
  const [mounted, setMounted] = useState(false);

  let userId = "";
  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    const { uid } = currentUser;
    userId = uid;
  }

  const fetcher = (url: any) =>
    fetch(url).then(async (res) => {
      const data = await res.json();
      return data.videos;
    });

  const { data, mutate } = useSWR(
    mounted ? `/api/get-bookmarked-videos?userId=${userId}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    setMounted(true);
  }, [userId]);

  useEffect(() => {
    if (data) {
      setBookmarkedVideos(data);
    }
  }, [data]);

  const allBookmarkedMovieVideos: any[] = bookmarkedVideos.filter(
    (element: any) => {
      return element.category === "Movie";
    }
  );
  const allBookmarkedTVSeriesVideos: any[] = bookmarkedVideos.filter(
    (element: any) => {
      return element.category === "TV Series";
    }
  );

  const allFilteredBookmarkedVideos: any[] = search(
    bookmarkedVideos,
    searchQuery
  );

  return (
    <div className="lg:flex">
      <NavBar isActive="bookmarks" />
      <motion.main
        className="my-6 lg:w-screen lg:overflow-x-hidden"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "linear" }}
      >
        <Search
          placeholderText="Search for bookmarked shows"
          setSearchQuery={setSearchQuery}
        />
        {searchQuery ? (
          <div>
            <SectionCards
              title={`Found ${allFilteredBookmarkedVideos.length} ${
                allFilteredBookmarkedVideos.length === 1 ? "result" : "results"
              } for '${searchQuery}'`}
              trending={false}
              videos={allFilteredBookmarkedVideos}
            />
          </div>
        ) : (
          <>
            {allBookmarkedMovieVideos.length > 0 && (
              <SectionCards
                title="Bookmarked Movies"
                trending={false}
                videos={allBookmarkedMovieVideos}
              />
            )}
            {allBookmarkedTVSeriesVideos.length > 0 && (
              <SectionCards
                title="Bookmarked TV Series"
                trending={false}
                videos={allBookmarkedTVSeriesVideos}
              />
            )}
          </>
        )}
      </motion.main>
    </div>
  );
};

export default Bookmarks;
