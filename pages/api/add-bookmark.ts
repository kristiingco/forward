import type { NextApiRequest, NextApiResponse } from "next";
import { addBookmark } from "../../lib/firebase";

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
      const data = await addBookmark(
        "8e8TMWNSvrYdO1Ob3A0hjQmswFr2",
        "DLVgG99yz6gAoI5Dy07k"
      );
      res.status(200).json({ bookmark: data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  }
}
