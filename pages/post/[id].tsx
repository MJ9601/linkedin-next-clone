import { Divider, Paper } from "@mantine/core";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import Comment from "../../components/Comment";
import PostCard from "../../components/PostCard";
import PageLayout from "../../layout/PageLayout";
import { Post } from "../../typing";

const Post_ = ({ post }: { post: Post }) => {
  const [_post, setPost] = useState<Post>(post);

  useEffect(() => {
    let id = setInterval(async () => {
      setPost(await (await fetch(`/api/posts/${post._id}`)).json());
    }, 60 * 60 * 3);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <Head>
        <title></title>
      </Head>
      <PostCard post={_post} postPage key={_post._id} />
      <Divider my="sm" label="Comments" />
      {_post?.comments?.map((comment) => (
        <Comment info={comment} key={comment._id} />
      ))}
    </div>
  );
};

Post_.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Post_;

// export const getStaticPaths = async () => {
//   const baseUrl = process.env.BASE_URL || "http://localhost:3000";
//   const posts = await (await fetch(`${baseUrl}/api/posts`)).json();
//   const paths = posts?.map((post: Post) => ({
//     params: {
//       id: post._id,
//     },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps = async ({ params }: { params: any }) => {
//   const baseUrl = process.env.BASE_URL || "http://localhost:3000";
//   const post = await (await fetch(`${baseUrl}/api/posts/${params.id}`)).json();

//   return {
//     props: {
//       post,
//     },
//     revalidate: false,
//   };
// };

export const getServerSideProps = async ({ params }: { params: any }) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const post = await (await fetch(`${baseUrl}/api/posts/${params?.id}`)).json();

  return {
    props: {
      post,
    },
  };
};
