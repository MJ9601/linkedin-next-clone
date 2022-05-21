import { ThumbUpIcon } from "@heroicons/react/outline";
import { Button, createStyles, Divider, Group, Paper } from "@mantine/core";
import { useSession } from "next-auth/react";
import PostCardHeader from "./PostCardHeader";

const useStyle = createStyles((theme) => ({
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
  },
  img: {
    width: "100%",
    objectFit: "contain",
  },
}));

const PostCard = ({ post }: { post: any }) => {
  const { classes } = useStyle();
  const { data: session, status } = useSession();
  return (
    <Paper shadow="md" radius="md" py="sm">
      <PostCardHeader info={""} />
      <div className={classes.wrapper}>
        <p className={classes.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis autem
          aliquam reprehenderit molestiae ratione, qui totam asperiores quae
          illum, ipsum a porro culpa accusantium dolorum.
        </p>
        {post.image && (
          <img
            className={classes.img}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMJ86C4k1NiGgExR5nL_EVmOX10eKWM5vFwlsp9b0nvhXvbvXAIMnhqBqjZRZLCzIoaSY&usqp=CAU"
          />
        )}
      </div>
      <Divider my="sm" />
      <Group position="apart" px="md">
        <Button
          variant="white"
          color="dark"
          size="xs"
          leftIcon={
            <ThumbUpIcon
              style={{ height: "20px", padding: "0", margin: "0" }}
            />
          }
        >
          Like
        </Button>
      </Group>
    </Paper>
  );
};

export default PostCard;
