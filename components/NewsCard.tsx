import { Center, Stack } from "@mantine/core";
import { Circle } from "tabler-icons-react";
import TimeAgo from "timeago-react";

const NewsCard = ({ news }: { news: any }) => {
  return (
    <Center
      sx={{
        margin: 0,
        width: "100%",
        justifyContent: "left",
        alignItems: "center",
        gap: "10px",
        padding: "0 5px",
        borderRadius: "7px",
        cursor: "pointer",
        color: "#333",
        textDecoration: "none",
        ":hover": {
          background: "#eee",
        },
      }}
      my={-15}
      component="a"
      href={news.url}
      target="_blank"
    >
      <Circle fill="black" size={10} color="#444" />
      <Stack spacing="xs" sx={{ width: "80%" }}>
        <p
          style={{
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: 500,
          }}
        >
          {news.title}
        </p>
        <p
          style={{
            marginTop: -25,
            fontSize: "12px",
            fontWeight: 500,
            color: "gray",
          }}
        >
          <TimeAgo datetime={news.publishedAt} />
        </p>
      </Stack>
    </Center>
  );
};

export default NewsCard;
