import { Divider, Paper } from "@mantine/core";
import Head from "next/head";
import React, { ReactElement } from "react";
import Comment from "../../components/Comment";
import PostCard from "../../components/PostCard";
import PageLayout from "../../layout/PageLayout";
import { Post } from "../../typing";

const Post_ = ({ post }: { post: Post }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Head>
        <title></title>
      </Head>
      <PostCard post={post} postPage />
      <Divider my="sm" label="Comments" />
      {post?.comments?.map((comment) => (
        <Comment info={comment} key={comment._id} />
      ))}
    </div>
  );
};

Post_.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Post_;

export const getStaticPaths = async () => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const posts = await (await fetch(`${baseUrl}/api/posts`)).json();
  const paths = posts?.map((post: Post) => ({
    params: {
      id: post._id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const post = await (await fetch(`${baseUrl}/api/posts/${params.id}`)).json();

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 5,
  };
};
