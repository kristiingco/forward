import type { NextApiRequest, NextApiResponse } from "next";
import { getAllVideos } from "../../lib/firebase";

type Data = {
  videos?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      let data: any = await getAllVideos();

      data = await Promise.all(
        data.map(async (video: any) => {
          return { ...video, isBookmarked: false };
        })
      );

      res.status(200).json({ videos: data });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
