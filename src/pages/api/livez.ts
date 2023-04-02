import { NextApiResponse,NextApiRequest } from "next/types";
import * as packageJson from "../../../package.json";

type Data = {
  version: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ version: packageJson.version });
}
