import { NextApiRequest, NextApiResponse } from "next";
import {
  deletePostById,
  getPostById,
  updatePostComments,
  updatePostLikes,
} from "../../../posts/services/posts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    cookies,
    method,
    body,
  } = req;

  const userAccessToken = cookies["next-auth.session-token"];

  if (method == "GET") {
    // get the post

    const { post, err } = await getPostById(String(id));
    !err ? res.status(200).send(post) : res.status(400).send(err);
  } else if (method == "DELETE") {
    // delete a post

    const { status, err } = await deletePostById(String(id), userAccessToken);
    if (!err) {
      status == 200
        ? res.status(200).send({ message: "Post deleted!" })
        : res.status(403).send({ message: "unauthorized access!" });
    } else {
      res.status(400).send(err);
    }
  } else if (method == "PUT") {
    // update the likes

    const { post, err } = await updatePostLikes(String(id), userAccessToken);
    !err ? res.status(201).send(post) : res.status(400).send(err);
  } else if (method == "PATCH") {
    // updated comments

    const { post, err } = await updatePostComments(
      String(id),
      userAccessToken,
      body
    );
    !err ? res.status(201).send(post) : res.status(400).send(err);
  }
}
