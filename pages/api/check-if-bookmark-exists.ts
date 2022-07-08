import type { NextApiRequest, NextApiResponse } from "next";
import { doesBookmarkExist } from "../../lib/firebase";

type Data = {
  exists?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId, videoId } = req.query;

  if (req.method === "GET") {
    try {
      const data = await doesBookmarkExist(userId, videoId);
      res.status(200).json({ exists: data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  }
}
