import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { Avatar, Center, createStyles, Group } from "@mantine/core";
import { decode } from "next-auth/jwt";
import { useEffect, useState } from "react";
import TimeAgo, { TDate } from "timeago-react";
import { User } from "../typing";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: "16px",
    margin: "0",
    padding: "0",
  },
  email: {
    margin: "0",
    padding: "0",
    fontSize: "12px",
    color: "#666",
    fontWeight: "bold",
  },
  date: {
    fontSize: "10px",
    margin: "0",
    padding: "0",
    color: "#999",
    fontWeight: "bold",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
    gap: "3px",
  },
}));

const PostCardHeader = ({
  author,
  createdAt,
}: {
  author: User | any;
  createdAt: TDate;
}) => {
  const { classes } = useStyles();

  // const [_author, setAuther] = useState<null | Object>(null);

  // useEffect(() => {
  //   const getUser = async (authorToken: string) => {
  //     const authorInfo = await decode({
  //       token: authorToken,
  //       secret: String(process.env.NEXTAUTH_SECRET),
  //     });
  //     setAuther(authorInfo);
  //   };
  //   getUser(author);
  // }, [authorToken]);
  // console.log(author);

  return (
    <Group position="apart" px="md">
      <Center sx={{ gap: "15px" }}>
        <Avatar src={author?.picture} radius="xl" />
        <div className={classes.wrapper}>
          <h2 className={classes.title}>{author?.name}</h2>
          <p className={classes.email}>{author?.email}</p>
          <p className={classes.date}>
            <TimeAgo datetime={createdAt} />
          </p>
        </div>
      </Center>
      <DotsHorizontalIcon style={{ height: "20px" }} />
    </Group>
  );
};

export default PostCardHeader;
