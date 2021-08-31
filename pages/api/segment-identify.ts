// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Analytics from "../../common/analytics";

type Data = {
  analytic: Record<string, any>;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const analytic = Analytics.identify({
    userId: "a1b2c3",
    traits: {
      key: "prop",
      createdAt: new Date(),
    },
  });
  res.status(200).json({ analytic });
}
