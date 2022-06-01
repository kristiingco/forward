const search = (videos: any[], searchQuery: string): any[] => {
  return videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default search;
