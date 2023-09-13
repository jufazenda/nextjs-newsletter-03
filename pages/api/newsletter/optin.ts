import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const controllerByMethod = {
  POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    console.log(req.body.email);

    res.status(200).json({ message: "Hello from Next.js!" });
  },
  GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(200).json({ message: "Hello from Next.js!" });
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const controller = controllerByMethod[req.method];
  if (!controller) {
    res.status(404).json({ message: "Nada encontrado" });
    return;
  }

  controller(req, res);
}
