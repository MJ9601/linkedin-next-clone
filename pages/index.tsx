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
  RingProgress,
  Stack,
  Text,
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
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { Post } from "../typing";
import { useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../lib/firebaseConfig";
import { useRecoilState } from "recoil";
import { newsState } from "../atoms/newsAtom";

const Home = ({
  posts,
  newsheadLine,
}: {
  posts: Post[];
  newsheadLine: any;
}) => {
  const { data: session, status } = useSession();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [text, setText] = useState("");
  const [_posts, setPosts] = useState<[] | Post[]>(posts);
  const [progress, setProgress] = useState(0);
  const [news, setNews] = useRecoilState(newsState);

  setNews(newsheadLine.articles);

  useEffect(() => {
    let getpost = setInterval(async () => {
      const response = await (await fetch("/api/posts")).json();
      setPosts(response);
    }, 60 * 60 * 2);
    return () => {
      clearInterval(getpost);
    };
  }, []);

  const uploadFile = (file: File) => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused");
            break;
          case "canceled":
            console.log("upload is canceled");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFileUrl(downloadURL)
        )
    );
  };

  const createPost = async () => {
    await (
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          imageUrl: !fileUrl ? "" : fileUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    setText("");
    setFileUrl("");
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
        {fileUrl || (progress > 0 && progress < 100) ? (
          <>
            <div style={{ display: "grid", placeItems: "center" }}>
              {!fileUrl ? (
                <RingProgress
                  roundCaps
                  thickness={12}
                  sections={[{ value: progress, color: "blue" }]}
                  label={
                    <Text color="blue" weight={700} align="center" size="md">
                      {Math.floor(progress)}%
                    </Text>
                  }
                />
              ) : (
                <Text color="blue" weight={700} align="center" size="md">
                  {fileUrl}
                </Text>
              )}
            </div>
          </>
        ) : (
          <Dropzone
            onDrop={(files) => {
              uploadFile(files[0]);
            }}
            onReject={(files) => alert("rejected files")}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            {(status) => (
              <div className={classes.uploadFile}>
                <FileUpload />
                <p className={classes.title}>Drag/Select a Picture</p>
                <p className={classes.cusionTag}>File should not exceed 5mb</p>
              </div>
            )}
          </Dropzone>
        )}
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
  const newsheadLine = await (
    await fetch(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.NEWS_API_KEY}`
    )
  ).json();

  return {
    props: {
      posts,
      newsheadLine,
    },
  };
};

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
