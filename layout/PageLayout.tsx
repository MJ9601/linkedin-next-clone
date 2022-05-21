import {
  AppShell,
  Aside,
  Avatar,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { ReactElement } from "react";
import { GridDots, Search } from "tabler-icons-react";
import {
  BellIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ChatIcon,
  HomeIcon,
  InformationCircleIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import HeaderIcons from "../components/HeaderIcons";
import { useSession } from "next-auth/react";
import NewsCard from "../components/NewsCard";

const PageLayout = ({ children }: { children: ReactElement }) => {
  const { data: session, status } = useSession();
  return (
    <AppShell
      sx={{ background: "rgb(245, 247, 248)" }}
      header={
        <Header height={60} sx={{ position: "sticky", top: "0", zIndex: 999 }}>
          <Container sx={{ minWidth: "89vw" }}>
            <Group grow align="center" position="apart">
              <Group align="center" position="left" spacing="xs">
                <MediaQuery smallerThan="sm" styles={{ maxWidth: "5%" }}>
                  <Image src="/logo.png" height={60} width={60} />
                </MediaQuery>
                <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                  <TextInput placeholder="Search" icon={<Search size={14} />} />
                </MediaQuery>
              </Group>
              <MediaQuery smallerThan="xs" styles={{ minWidth: "76%" }}>
                <Group align="center" position="right" spacing="sm">
                  <HeaderIcons title="Home" Icon={HomeIcon} active />
                  <HeaderIcons title="My Network" Icon={UsersIcon} />
                  <HeaderIcons title="Jobs" Icon={BriefcaseIcon} />
                  <HeaderIcons title="Messaging" Icon={ChatIcon} />
                  <HeaderIcons title="Notifications" Icon={BellIcon} />
                  <HeaderIcons
                    title="Me"
                    AvatarSrc={session?.user?.image || ""}
                  />
                  <HeaderIcons title="Work" Icon={GridDots} />
                </Group>
              </MediaQuery>
            </Group>
          </Container>
        </Header>
      }
      navbar={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Navbar
            width={{ base: 290, lg: "30%" }}
            px="xs"
            sx={{ background: "rgb(245, 247, 248)" }}
          >
            <Stack align="end" pr="sm" pt="md" spacing="md">
              <Card shadow="md" p="lg" sx={{ maxWidth: 258 }}>
                <Card.Section>
                  <Image
                    src="/background.jpg"
                    width={300}
                    height={100}
                    objectFit="cover"
                  />
                </Card.Section>
                <Stack align="center">
                  <Avatar
                    src={session?.user?.image || ""}
                    size="lg"
                    radius="xl"
                    mt={-35}
                  />
                  <Text weight={500} size="lg">
                    {session?.user?.name}
                  </Text>
                  <Text weight={500} size="sm" color={"gray"} mt={-13}>
                    {session?.user?.email}
                  </Text>
                </Stack>
                <Divider my="sm" />
                <Stack align="start" py="md">
                  <Group noWrap position="apart" sx={{ width: "100%" }}>
                    <Text weight={500} size="sm">
                      Who viewed your profile
                    </Text>
                    <Text weight={500} size="md" color="blue">
                      320
                    </Text>
                  </Group>
                  <Group noWrap position="apart" sx={{ width: "100%" }}>
                    <Text weight={500} size="sm">
                      Views of your posts
                    </Text>
                    <Text weight={500} size="md" color="blue">
                      1320
                    </Text>
                  </Group>
                </Stack>
                <Divider my="sm" />
                <Stack align="center" px="sm">
                  <Text weight={500} size="xs" color={"gray"}>
                    Access exclusive tools & insights
                  </Text>
                  <Text
                    mt={-13}
                    weight={600}
                    size="md"
                    color="grape"
                    sx={{ cursor: "pointer" }}
                  >
                    Try Premium for free
                  </Text>
                </Stack>
                <Divider my="sm" />
                <Center inline>
                  <BookmarkIcon style={{ height: "25px", color: "gray" }} />
                  <Text size="md" weight={500}>
                    My items
                  </Text>
                </Center>
              </Card>

              <Card
                shadow="md"
                p="lg"
                sx={{ minWidth: 258, position: "sticky", top: "65px" }}
              >
                <Stack align="start">
                  <Text
                    size="md"
                    color="blue"
                    weight={500}
                    sx={{ cursor: "pointer" }}
                  >
                    Groups
                  </Text>
                  <Center
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      size="md"
                      color="blue"
                      weight={500}
                      sx={{ cursor: "pointer" }}
                    >
                      Events
                    </Text>
                    <PlusIcon style={{ height: "25px" }} />
                  </Center>
                  <Text
                    size="md"
                    color="blue"
                    weight={500}
                    sx={{ cursor: "pointer" }}
                  >
                    Followed Hashtags
                  </Text>
                </Stack>
                <Divider my="sm" />
                <Center>
                  <Text size="md" weight={500}>
                    Discover More
                  </Text>
                </Center>
              </Card>
            </Stack>
          </Navbar>
        </MediaQuery>
      }
      aside={
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Aside
            p="md"
            hiddenBreakpoint="sm"
            width={{ base: "25%", lg: "30%" }}
            sx={{ background: "rgb(245, 247, 248)" }}
          >
            <Stack align="left" spacing="md">
              <Card shadow="md" px="sm" sx={{ maxWidth: 300 }}>
                <Stack
                  align="start"
                  justify="start"
                  spacing="md"
                  sx={{ width: "100%" }}
                >
                  <Center
                    sx={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Text size="md" weight={500}>
                      Linkedin News
                    </Text>
                    <InformationCircleIcon
                      style={{ height: "25px", color: "#444" }}
                    />
                  </Center>
                  {/* new section */}
                  <NewsCard />
                  <NewsCard />
                  <NewsCard />
                  <NewsCard />
                  <NewsCard />
                </Stack>
              </Card>
              <Paper
                shadow="md"
                sx={{
                  maxWidth: 300,
                  minHeight: 250,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src="/work.jpeg"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to right, #444, transparent)",
                  }}
                >
                  <Title
                    order={3}
                    style={{
                      padding: "45px 15px",
                      width: "75%",
                      color: "white",
                      fontWeight: 500,
                    }}
                  >
                    Find your dream Job with Us
                  </Title>
                  <Button variant="filled" color="blue" mx={20}>
                    Search for Jobs
                  </Button>
                </div>
              </Paper>
            </Stack>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={100} sx={{ background: "black" }}>
          <Group></Group>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
};

export default PageLayout;
