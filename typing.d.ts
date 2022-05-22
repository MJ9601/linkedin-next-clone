import { ObjectId } from "mongodb";
import { TDate } from "timeago-react";

export type Post = {
  _id: string;
  author: string;
  text: string;
  videoUrl?: string;
  imageUrl?: string;
  likes?: string[] | [];
  comments?: Comment[] | [];
  createdAt?: TDate;
};

export type Comment = {
  _id: string;
  author: string;
  text: string;
  post: Post;
  createdAt: string;
};

export type User = {
  name: string;
  email: string;
  picture: string;
};
