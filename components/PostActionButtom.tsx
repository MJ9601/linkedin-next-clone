import { createStyles } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import { Icon } from "tabler-icons-react";
import { useRecoilState } from "recoil";
import { commentModalState } from "../atoms/commentModalAtom";

const PostActionButtom = ({
  title,
  Icon,
  postId,
  color,
  count,
}: {
  title: string;
  Icon: Icon;
  postId: string;
  color: string;
  count?: number;
}) => {
  const { data: session, status } = useSession();
  const { classes } = useStyles({ color });

  const [commentModalOpen, setCommentModalOpen] =
    useRecoilState(commentModalState);

  const handleLike = async () => {
    await (
      await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  };

  const handleDel = async () => {
    await (
      await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  };

  const handleClick = async () => {
    if (title == "Like") handleLike();
    else if (title == "Delete") handleDel();
    else if (title == "Comment") setCommentModalOpen(true);
  };

  return (
    <div className={classes.wrapper} onClick={handleClick}>
      <p className={classes.count}>{count != 0 && count}</p>
      <Icon className={classes.icon} />
      <p className={classes.title}>{title}</p>
    </div>
  );
};

export default PostActionButtom;

const useStyles = createStyles((theme, { color }: { color: string }) => ({
  wrapper: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    margin: "0",
    padding: "4px 16px",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "all .4s",
    color: "#777",
    ":hover": {
      color: color,
      backgroundColor: "#EBECEE",
    },
  },
  count: { padding: "0", margin: "0", fontSize: "15px" },
  icon: { padding: "0", margin: "0", height: 17 },
  title: {
    padding: "0",
    margin: "0",
    fontSize: "15px",
    fontWeight: 500,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
}));
