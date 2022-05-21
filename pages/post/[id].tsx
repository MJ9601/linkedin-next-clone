import React, { ReactElement } from "react";
import Comment from "../../components/Comment";
import PageLayout from "../../layout/PageLayout";

const Post = () => {
  return (
    <div>
      <div>post</div>
      <Comment />
    </div>
  );
};

Post.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Post;
