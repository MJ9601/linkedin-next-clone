import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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

// https://rb.gy/vtbzlp logo
// https://rb.gy/vkzpzt pic
