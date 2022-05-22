import { ChatAltIcon, ThumbUpIcon, TrashIcon } from "@heroicons/react/outline";
import {
  Button,
  createStyles,
  Divider,
  Group,
  Modal,
  Paper,
  Textarea,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Send } from "tabler-icons-react";
import { commentModalState } from "../atoms/commentModalAtom";
import { Post, User } from "../typing";
import PostActionButtom from "./PostActionButtom";
import PostCardHeader from "./PostCardHeader";

const PostCard = ({ post, postPage }: { post: Post; postPage?: boolean }) => {
  const { classes } = useStyle({ postPage });
  const { data: session, status } = useSession();
  const router = useRouter();
  const [opened, setOpened] = useRecoilState(commentModalState);
  const [author, setAuthor] = useState<null | User>(null);
  const [comment, setComment] = useState<string>("");

  const handleComment = async () => {
    await (
      await fetch(`/api/posts/${post._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: comment,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    setComment("");
    setOpened(false);
  };

  useEffect(() => {
    const getuser = async () => {
      const response = await (await fetch(`/api/users/${post.author}`)).json();
      setAuthor(response);
    };
    getuser();
  }, [post]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="New Comment"
      >
        <Divider my="sm" />
        <Textarea
          placeholder="This post was ..."
          minRows={4}
          autosize
          maxRows={6}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button fullWidth mt="md" onClick={handleComment}>
          Publish
        </Button>
      </Modal>

      <Paper shadow="md" radius="md" py="sm">
        <div
          style={{ cursor: !postPage ? "pointer" : "default" }}
          onClick={() => {
            !postPage && router.push(`/post/${post._id}`);
          }}
        >
          <PostCardHeader
            author={author}
            createdAt={post.createdAt || new Date()}
          />
          <div className={classes.wrapper}>
            <p className={classes.text}>{post.text}</p>
            {post.imageUrl && (
              <img
                className={classes.img}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMJ86C4k1NiGgExR5nL_EVmOX10eKWM5vFwlsp9b0nvhXvbvXAIMnhqBqjZRZLCzIoaSY&usqp=CAU"
              />
            )}
          </div>
        </div>
        <Divider my="sm" />
        <Group position="apart" px="md">
          <PostActionButtom
            Icon={ThumbUpIcon}
            color="green"
            postId={post._id}
            title="Like"
            count={post?.likes?.length}
          />
          <PostActionButtom
            Icon={ChatAltIcon}
            color="#86EBFF"
            postId={post._id}
            title="Comment"
            count={post?.comments?.length}
          />
          {session?.user?.email !== author?.email && (
            <>
              <PostActionButtom
                Icon={TrashIcon}
                color="red"
                postId={post._id}
                title="Delete"
              />
            </>
          )}
          <PostActionButtom
            Icon={Send}
            color="blue"
            postId={post._id}
            title="Share"
            count={0}
          />
        </Group>
      </Paper>
    </>
  );
};

export default PostCard;

const useStyle = createStyles(
  (theme, { postPage }: { postPage?: boolean }) => ({
    wrapper: {
      margin: "10px 0",
      padding: "0",
      width: "100%",
      height: "fit-content",
    },
    text: {
      fontWeight: 500,
      fontSize: "15px",
      padding: "0 19px",
      lineHeight: "22px",
      width: "90%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      display: postPage ? "block" : "-webkit-box",
    },
    img: {
      width: "100%",
      objectFit: "contain",
    },
  })
);
