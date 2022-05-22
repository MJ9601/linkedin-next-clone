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
import { Send } from "tabler-icons-react";
import { Post, User } from "../typing";
import PostCardHeader from "./PostCardHeader";

const PostCard = ({ post, postPage }: { post: Post; postPage?: boolean }) => {
  const { classes } = useStyle({ postPage });
  const { data: session, status } = useSession();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [author, setAuthor] = useState<null | User>(null);

  const handleDel = async () => {
    await (
      await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
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
        />
        <Button fullWidth mt="md">
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
          <Button
            variant="white"
            color="dark"
            size="xs"
            sx={{ ":hover": { color: "blue" } }}
            leftIcon={
              <ThumbUpIcon
                style={{ height: "20px", padding: "0", margin: "0" }}
              />
            }
          >
            Like
          </Button>
          {session?.user?.email !== author?.email ? (
            <Button
              variant="white"
              color="dark"
              size="xs"
              sx={{ ":hover": { color: "blue" } }}
              leftIcon={
                <ChatAltIcon
                  style={{ height: "20px", padding: "0", margin: "0" }}
                />
              }
              onClick={() => setOpened(true)}
            >
              Comment
            </Button>
          ) : (
            <Button
              variant="white"
              color="dark"
              size="xs"
              sx={{ ":hover": { color: "blue" } }}
              leftIcon={
                <TrashIcon
                  style={{ height: "20px", padding: "0", margin: "0" }}
                />
              }
              onClick={handleDel}
            >
              Delete
            </Button>
          )}
          <Button
            variant="white"
            color="dark"
            size="xs"
            sx={{ ":hover": { color: "blue" } }}
            leftIcon={
              <Send style={{ height: "20px", padding: "0", margin: "0" }} />
            }
          >
            Share
          </Button>
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
