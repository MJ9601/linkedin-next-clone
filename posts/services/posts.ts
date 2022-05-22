import { Db, ObjectId } from "mongodb";
import { decode } from "next-auth/jwt";
import { connectToDB } from "../util/mongodbConnection";

export const createNewPost = async ({
  body,
  authorToken,
}: {
  body: any;
  authorToken: string;
}) => {
  const { db } = await connectToDB();
  console.log(body);

  const decoded = await decode({
    token: authorToken,
    secret: String(process.env.NEXTAUTH_SECRET),
  });

  const post = { ...body, author: decoded?.sub };
  try {
    const newPost = await db
      .collection("posts")
      .insertOne({ ...post, createdAt: new Date() });
    return { newPost };
  } catch (err) {
    return { err };
  }
};

export const getAllPost = async () => {
  const { db } = await connectToDB();
  try {
    const allPosts = await db
      .collection("posts")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return { allPosts };
  } catch (err) {
    return { err };
  }
};

export const getPostById = async (id: string) => {
  const { db } = await connectToDB();
  try {
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });

    return { post };
  } catch (err) {
    return { err };
  }
};

export const deletePostById = async (id: string, accessToken: string) => {
  const { db } = await connectToDB();

  const decoded = await decode({
    token: accessToken,
    secret: String(process.env.NEXTAUTH_SECRET),
  });
  try {
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });
    if (post.author == decoded?.sub) {
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
      return { status: 200 };
    }
    return { status: 403 };
  } catch (err) {
    return { err };
  }
};
