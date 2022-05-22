import Head from "next/head";
import { useSession } from "next-auth/react";
import { ReactElement, useState } from "react";
import PageLayout from "../layout/PageLayout";
import {
  Avatar,
  Box,
  Button,
  createStyles,
  Divider,
  Group,
  Modal,
  Paper,
  Stack,
  Textarea,
} from "@mantine/core";
import PostCard from "../components/PostCard";
import Postbuttom from "../components/Postbuttom";
import {
  BriefcaseIcon,
  PhotographIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import { FileUpload, Notes } from "tabler-icons-react";
import { Dropzone } from "@mantine/dropzone";
import { Post } from "../typing";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  postCreater: {
    border: "1px solid gray",
    width: "90%",
    padding: "8px 10px",
    borderRadius: "99px",
    margin: "0",
    cursor: "pointer",
  },
  uploadFile: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
    gap: "3px",
  },
  cusionTag: {
    margin: 0,
    fontSize: 12,
  },
  title: {
    margin: "2px 0",
  },
}));

const Home = ({ posts }: { posts: Post[] }) => {
  const { data: session, status } = useSession();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [text, setText] = useState("");
  const [_posts, setPosts] = useState<[] | Post[]>(posts);

  useEffect(() => {
    let getpost = setInterval(async () => {
      const response = await (await fetch("/api/posts")).json();
      setPosts(response);
    }, 60 * 60 * 2);
    return () => {
      clearInterval(getpost);
    };
  }, [text]);

  const createPost = async () => {
    if (!file) {
      await (
        await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            text: text,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
    }
    setText("");
    setOpened(false);
  };

  return (
    <>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>

      <Modal opened={opened} onClose={() => setOpened(false)} title="New Post">
        <Divider my="sm" />
        <Textarea
          placeholder="This is about .."
          minRows={4}
          autosize
          maxRows={10}
          mb="lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Dropzone onDrop={(files) => {}}>
          {(status) => (
            <div className={classes.uploadFile}>
              <FileUpload />
              <p className={classes.title}>Drag/Select a Video or Picture</p>
              <p className={classes.cusionTag}>File should not exceed 5mb</p>
            </div>
          )}
        </Dropzone>
        <Button mt="md" fullWidth onClick={createPost}>
          Publish
        </Button>
      </Modal>

      <div style={{ minHeight: "100vh" }}>
        <Paper shadow="md" py="md" px="xs">
          <Group position="left" align="center" noWrap>
            <Avatar src={session?.user?.image} size="md" radius="xl" />
            <div
              className={classes.postCreater}
              onClick={() => setOpened(true)}
            >
              Start a Post
            </div>
          </Group>
          <Group position="apart" mt="md" px="md" noWrap>
            <Postbuttom color="blue" Icon={PhotographIcon} title="Photo" />
            <Postbuttom color="green" Icon={VideoCameraIcon} title="Video" />
            <Postbuttom color="cyan" Icon={BriefcaseIcon} title="Jobs" />
            <Postbuttom color="red" Icon={Notes} title="Write Article" />
          </Group>
        </Paper>
        <Divider my="sm" />
        <Stack spacing="xs">
          {_posts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </Stack>
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Home;

export const getServerSideProps = async () => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  const url = `${baseUrl}/api/posts`;
  const posts = await (await fetch(url)).json();

  return {
    props: {
      posts,
    },
  };
};
