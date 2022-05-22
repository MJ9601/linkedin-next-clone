import { NextApiRequest, NextApiResponse } from "next";
import { getToken, decode, encode, JWTDecodeParams, JWT } from "next-auth/jwt";
import { createNewPost, getAllPost } from "../../../posts/services/posts";
import { Post } from "../../../typing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | Post[] | any>
) {
  const { method, body, cookies } = req;

  const decoded = await decode({
    token: cookies["next-auth.session-token"],
    secret: String(process.env.NEXTAUTH_SECRET),
  });

  const userAccessToken = cookies["next-auth.session-token"];

  // res.send({
  //   decoded,
  //   cookie: req.cookies["next-auth.session-token"],
  // });

  if (method == "GET") {
    const { allPosts, err } = await getAllPost();
    !err ? res.status(200).send(allPosts) : res.status(500).send(err);
  }

  if (method === "POST") {
    const { newPost, err } = await createNewPost({
      body,
      authorToken: userAccessToken,
    });
    !err ? res.status(201).send(newPost) : res.status(400).send(err);
  }
}
