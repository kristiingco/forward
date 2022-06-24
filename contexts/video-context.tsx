import { createContext, useState, useEffect } from "react";

export const VideoContext = createContext({
  allVideos: {},
  setAllVideos: () => {},
});

export const VideoProvider = ({ children }: any) => {
  const [allVideos, setAllVideos] = useState<{}>({});

  useEffect(() => {
    const getVideos = async () => {
      const allVideos = await fetch("/api/get-all-videos").then(async (res) => {
        const data = await res.json();
        return data.videos;
      });
      setAllVideos(allVideos);
    };

    getVideos();
  }, []);

  const value: any = { allVideos, setAllVideos };
  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};
