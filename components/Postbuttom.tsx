import { createStyles } from "@mantine/core";
import React from "react";
import { Icon } from "tabler-icons-react";

const Postbuttom = ({
  color,
  Icon,
  title,
}: {
  color: string;
  Icon: Icon;
  title: string;
}) => {
  const { classes } = useStyle();
  return (
    <div className={classes.wrapper}>
      <Icon style={{ height: "20px", color: color }} />
      <p className={classes.title}>{title}</p>
    </div>
  );
};

export default Postbuttom;

const useStyle = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "left",
    gap: "5px",
    alignItems: "center",
    cursor: "pointer",
    transition: "all .5s",
    borderRadius: "4px",
    padding: "5px 8px",
    margin: "0",
    color: "gray",
    ":hover": {
      backgroundColor: "#B7C7F9",
      color: "black",
    },
  },
  title: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "bold",
  },
}));
