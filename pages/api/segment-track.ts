// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Analytics from "../../common/analytics";

type Data = {
  analytic: Record<string, any>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const analytic = Analytics.track(
    {
      userId: "a1b2c3",
      event: "FormSubmitted",
      properties: req.body,
    },
    error => error && console.error(error)
  );
  res.status(200).json({ analytic });
}
