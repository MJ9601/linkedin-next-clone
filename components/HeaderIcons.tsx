import { Avatar, Box, MediaQuery, Stack, Text } from "@mantine/core";
import { ReactElement, ReactNode } from "react";
import { Icon } from "tabler-icons-react";

const HeaderIcons = ({
  Icon,
  title,
  AvatarSrc,
  active,
}: {
  Icon?: Icon;
  title: string;
  AvatarSrc?: string;
  active?: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        cursor: "pointer",
        color: "gray",
        transition: "all .5s ease",
        ":hover": {
          color: "blue",
        },
      }}
    >
      {Icon ? (
        <Icon style={{ height: "25px" }} />
      ) : (
        <Avatar src={AvatarSrc} alt="" radius={"xl"} size="sm" />
      )}
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Text p={0} weight={500} size="sm">
          {title}
        </Text>
      </MediaQuery>
    </Box>
  );
};

export default HeaderIcons;
