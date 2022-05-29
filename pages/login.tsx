import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forward | Log In</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center gap-16 items-center h-screen">
        <Image src={"/static/logo.svg"} alt="Logo" width="32px" height="26px" />
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
