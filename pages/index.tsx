import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { ReactElement, useEffect } from "react";
import PageLayout from "../layout/PageLayout";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      <div>linkedin clone next app</div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Home;
