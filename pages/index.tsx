import Head from "next/head";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import PageLayout from "../layout/PageLayout";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      <div style={{ minHeight: "100vh" }}>linkedin clone next app</div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Home;
