import {
  AppShell,
  Aside,
  Avatar,
  Card,
  Center,
  Container,
  Divider,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import Image from "next/image";
import { ReactElement } from "react";
import { GridDots, Home, Search } from "tabler-icons-react";
import {
  BellIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ChatIcon,
  HomeIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import HeaderIcons from "../components/HeaderIcons";
import { useSession } from "next-auth/react";

const PageLayout = ({ children }: { children: ReactElement }) => {
  const { data: session, status } = useSession();
  return (
    <AppShell
      sx={{ background: "rgb(245, 247, 248)" }}
      header={
        <Header height={60} sx={{ position: "sticky", top: "0" }}>
          <Container sx={{ minWidth: "89vw" }}>
            <Group grow align="center" position="apart">
              <Group align="center" position="left" spacing="xs">
                <Image src="/logo.png" height={60} width={60} />
                <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                  <TextInput placeholder="Search" icon={<Search size={14} />} />
                </MediaQuery>
              </Group>
              <Group
                align="center"
                sx={{ minWidth: "60%" }}
                position="right"
                spacing="md"
              >
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

              <Card shadow="md" p="lg" sx={{ minWidth: 258 }}>
                <Stack align="start">
                  <Text
                    size="md"
                    color="blue"
                    weight={500}
                    sx={{ cursor: "pointer" }}
                  >
                    Groups
                  </Text>
                  <Group
                    grow
                    position="apart"
                    align="center"
                    sx={{ width: "100%" }}
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
                  </Group>
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
            <Stack align="left">
              <Card shadow="md" px="sm" sx={{ maxWidth: 300 }}>
                <Stack align='start' justify="start" spacing='md'>
                  
                </Stack>
              </Card>
            </Stack>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer
          height={100}
          sx={{ background: "black", position: "sticky", bottom: "0" }}
        >
          <Group></Group>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
};

export default PageLayout;
