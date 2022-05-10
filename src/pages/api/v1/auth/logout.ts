import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string
}
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not support" });
  }

  const cookies = Cookies(req, res);
  cookies.set("jwt");

  res.status(200).json({ message: "logout successfully" });
}
