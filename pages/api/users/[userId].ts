import { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "../../../posts/services/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { userId },
  } = req;
  console.log(userId);
  const { user, err } = await getUserById(String(userId));
  console.log(user);
  !err ? res.status(200).send(user) : res.status(400).send(err);
}
