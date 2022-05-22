import { Avatar, Box, MediaQuery, Text } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/home");
    },
  });

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
        <Avatar
          src={AvatarSrc}
          alt=""
          radius={"xl"}
          size="sm"
          onClick={() => signOut()}
        />
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
