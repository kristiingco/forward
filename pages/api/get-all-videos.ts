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
      const data = await getAllVideos();
      res.status(200).json({ videos: data });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
