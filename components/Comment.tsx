import { Avatar, createStyles, Paper } from "@mantine/core";
import React from "react";

const Comment = ({ info }: { info: any }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper shadow="md" px="md" py="sm">
        <p className={classes.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
          nisi neque molestias possimus deleniti amet nam temporibus. Mollitia,
          reiciendis quasi!
        </p>
      </Paper>
      <Avatar src="" radius="xl" />
    </div>
  );
};

export default Comment;

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
}));
