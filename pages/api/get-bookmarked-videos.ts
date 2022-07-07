import type { NextApiRequest, NextApiResponse } from "next";
import { getBookmarkedVideos } from "../../lib/firebase";

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
      const { userId } = req.query;
      let data: any = await getBookmarkedVideos(userId);

      data = await Promise.all(
        data.map(async (video: any) => {
          return video;
        })
      );

      res.status(200).json({ videos: data });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
