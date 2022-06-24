import type { NextApiRequest, NextApiResponse } from "next";
import { modifyBookmark } from "../../lib/firebase";

type Data = {
  bookmark?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId, videoId } = req.query;

  if (req.method === "POST") {
    try {
      const data = await modifyBookmark(userId, videoId);
      res.status(200).json({ bookmark: data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  }
}
