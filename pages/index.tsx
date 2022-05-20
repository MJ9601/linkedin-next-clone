import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (!session) router.push("/home");
  }, [session]);

  return (
    <>
      <Head>
        <title>linkedin clone</title>
      </Head>
      <div>linkedin clone next app</div>
    </>
  );
};

export default Home;

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);

  if (!session) return { notFound: true };

  return {
    props: {
      session,
    },
  };
};
