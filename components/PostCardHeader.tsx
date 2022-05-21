import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { Avatar, Center, createStyles, Group } from "@mantine/core";

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

const PostCardHeader = ({ info }: { info: any }) => {
  const { classes } = useStyles();
  return (
    <Group position="apart" px="md">
      <Center sx={{ gap: "15px" }}>
        <Avatar src="" radius="xl" />
        <div className={classes.wrapper}>
          <h2 className={classes.title}>m</h2>
          <p className={classes.email}>mj@yahoo.com</p>
          <p className={classes.date}>2 hours ago</p>
        </div>
      </Center>
      <DotsHorizontalIcon style={{ height: "20px" }} />
    </Group>
  );
};

export default PostCardHeader;
