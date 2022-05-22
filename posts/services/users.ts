import { ObjectId } from "mongodb";
import { connectToDB } from "../util/mongodbConnection";

export const getUserById = async (id: string) => {
  const { db } = await connectToDB();
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    return { user };
  } catch (err) {
    return { err };
  }
};
