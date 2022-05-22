import { Avatar, createStyles, Paper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import { Comment, User } from "../typing";

const Comment_ = ({ info }: { info: Comment }) => {
  const { classes } = useStyles();

  const [author, setAuthor] = useState<null | User>(null);
  useEffect(() => {
    const getAuthor = async (authorId: string) =>
      setAuthor(await (await fetch(`/api/users/${authorId}`)).json());

    getAuthor(info.author);
  }, [info]);
  return (
    <div className={classes.wrapper}>
      <Paper shadow="md" px="md" pt="sm" pb="xl" sx={{ position: "relative" }}>
        <h3 className={classes.title}>{author?.name}</h3>
        <p className={classes.text}>{info.text}</p>
        <p className={classes.date}>
          <TimeAgo datetime={info.createdAt} />
        </p>
      </Paper>
      <Avatar src={author?.picture} radius="xl" />
    </div>
  );
};

export default Comment_;

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    margin: "5px 0",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "5px",
  },
  text: {
    fontSize: "15px",
    margin: "0",
    padding: "0",
    lineHeight: "23px",
  },
  title: {
    margin: 0,
    marginBottom: 3,
    fontWeight: 600,
    fontSize: 10,
    color: "gray",
  },
  date: {
    margin: 0,
    position: "absolute",
    fontSize: "12px",
    color: "gray",
    right: 5,
  },
}));
