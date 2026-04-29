import { NextApiRequest, NextApiResponse } from "next";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug = "" } = req.query;
  const params = req.url?.split("?") || [];

  if (req.query.secret !== process.env.NEXT_PUBLIC_STORYBLOK_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setDraftMode({ enable: true })

  const previous = res.getHeader("Set-Cookie");
  if (previous && Array.isArray(previous)) {
    const updated = previous.map((cookie) =>
      cookie.replace("SameSite=Lax", "SameSite=None;Secure")
    );
    res.setHeader("Set-Cookie", updated);
  }

  res.redirect(`/${slug}?${params[1] || ""}`);
}
