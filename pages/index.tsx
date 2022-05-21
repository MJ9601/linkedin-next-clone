import Head from "next/head";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import PageLayout from "../layout/PageLayout";
import { Box, Stack } from "@mantine/core";
import PostCard from "../components/PostCard";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      <div style={{ minHeight: "100vh" }}>
        <Box>create post section</Box>
        <Stack spacing="xs">
          <PostCard post={""} />
          <PostCard post={""} />
          <PostCard post={""} />
        </Stack>
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Home;
