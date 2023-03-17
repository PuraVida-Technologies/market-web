import { NextApiResponse,NextApiRequest } from "next/types";
import { version } from "../../../package.json";

type Data = {
  version: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ version });
}
