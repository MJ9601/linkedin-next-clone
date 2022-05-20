import {
  AppShell,
  Aside,
  Container,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  TextInput,
} from "@mantine/core";
import Image from "next/image";
import { ReactElement } from "react";
import { GridDots, Home, Search } from "tabler-icons-react";
import {
  BellIcon,
  BriefcaseIcon,
  ChatIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import HeaderIcons from "../components/HeaderIcons";
import { useSession } from "next-auth/react";

const PageLayout = ({ children }: { children: ReactElement }) => {
  const { data: session, status } = useSession();
  return (
    <AppShell
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
          <Navbar width={{ base: "25%", lg: "30%" }} px="xs">
            <Stack></Stack>
          </Navbar>
        </MediaQuery>
      }
      aside={
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Aside
            p="md"
            hiddenBreakpoint="sm"
            width={{ base: "25%", lg: "30%" }}
          >
            <Stack></Stack>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer
          height={120}
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
