import { Center, Stack} from "@mantine/core";
import { Circle } from "tabler-icons-react";

const NewsCard = () => {
  return (
    <Center
      sx={{
        width: "100%",
        justifyContent: "left",
        alignItems: "center",
        gap: "10px",
        padding: "0 5px",
        borderRadius: "7px",
        cursor: "pointer",
        ":hover": {
          background: "#eee",
        },
      }}
      my={-15}
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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam quaerat
          impedit corrupti obcaecati sequi exercitationem. Sed dolorem maiores
          enim ea architecto voluptates magni ex dolor?
        </p>
        <p
          style={{
            marginTop: -25,
            fontSize: "12px",
            fontWeight: 500,
            color: "gray",
          }}
        >
          3 hours ago
        </p>
      </Stack>
    </Center>
  );
};

export default NewsCard;
