import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Header,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { ChevronRight } from "tabler-icons-react";
import { getProviders, signIn } from "next-auth/react";
const Home_ = ({
  providers,
}: {
  providers: {
    google: {
      callbackUrl: string;
      id: string;
      name: string;
      type: string;
      signinUrl: string;
    };
  };
}) => {
  return (
    <>
      <Head>
        <title>LinkedIn Clone</title>
      </Head>
      <div style={{ height: "100vh", backgroundColor: "#f5f7f8" }}>
        <Header height={70} px="sm" py="xs" sx={{ backgroundColor: "#f5f7f8" }}>
          <Container px="xl" mx="auto" sx={{ minWidth: "80%" }}>
            <Group align="center" noWrap position="apart">
              <Image src="/logo.svg" width={170} height={60} />
              <Button
                variant="outline"
                color="blue"
                onClick={() =>
                  signIn(providers.google.id, { callbackUrl: "/" })
                }
              >
                Sign in
              </Button>
            </Group>
          </Container>
        </Header>
        <Container sx={{ minWidth: "80%" }} py="xl">
          <Grid align="center" justify="center" gutter={"lg"}>
            <Grid.Col lg={6} md={12}>
              <Center>
                <Stack spacing="lg">
                  <Title
                    order={1}
                    pb="50px"
                    style={{
                      fontWeight: "400",
                      color: "#994F3E",
                      fontSize: "35px",
                    }}
                  >
                    Welcome to your professional community
                  </Title>
                  <Paper
                    radius={"md"}
                    shadow="sm"
                    sx={{
                      cursor: "pointer",
                      transition: "all .5s",
                      ":hover": {
                        background: "#7EC7E9",
                      },
                    }}
                  >
                    <Group position="apart" px="xl" py="md">
                      <Text size="lg" weight={500}>
                        Search for a job
                      </Text>
                      <ChevronRight />
                    </Group>
                  </Paper>
                  <Paper
                    radius={"md"}
                    shadow="sm"
                    sx={{
                      cursor: "pointer",
                      transition: "all .5s",
                      ":hover": {
                        background: "#7EC7E9",
                      },
                    }}
                  >
                    <Group position="apart" px="xl" py="md">
                      <Text size="lg" weight={500}>
                        Find a person you know
                      </Text>
                      <ChevronRight />
                    </Group>
                  </Paper>
                  <Paper
                    shadow="sm"
                    radius={"md"}
                    sx={{
                      cursor: "pointer",
                      transition: "all .5s",
                      ":hover": {
                        background: "#7EC7E9",
                      },
                    }}
                  >
                    <Group position="apart" px="xl" py="md">
                      <Text size="lg" weight={500}>
                        Learn a new skill
                      </Text>
                      <ChevronRight />
                    </Group>
                  </Paper>
                </Stack>
              </Center>
            </Grid.Col>
            <Grid.Col lg={6} md={12}>
              <Center>
                <Image
                  src="/homepage.svg"
                  height={720}
                  width={480}
                  objectFit="contain"
                />
              </Center>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Home_;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
