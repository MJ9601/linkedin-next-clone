import { Divider, Paper } from "@mantine/core";
import React, { ReactElement } from "react";
import Comment from "../../components/Comment";
import PostCard from "../../components/PostCard";
import PostCardHeader from "../../components/PostCardHeader";
import PageLayout from "../../layout/PageLayout";

const Post = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <PostCard post={""} postPage />
      <Divider my="sm" label="Comments" />
      <Comment info={""} />
      <Comment info={""} />
    </div>
  );
};

Post.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Post;
