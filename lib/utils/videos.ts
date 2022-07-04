export const getAllVideos = async (baseUrl: string) => {
  const allVideos = await fetch(baseUrl + "/api/get-all-videos").then(
    async (res) => {
      const data = await res.json();
      return data.videos;
    }
  );

  return allVideos;
};
