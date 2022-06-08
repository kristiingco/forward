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
  if (req.method === "POST") {
    try {
      const data = await modifyBookmark(
        "8e8TMWNSvrYdO1Ob3A0hjQmswFr2",
        "Rn5bTww928HwS1wwk9ke"
      );
      res.status(200).json({ bookmark: data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  }
}
