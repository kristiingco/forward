import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SignUpForm from "../components/SignUpForm";

const SignUp: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forward | Sign Up</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center gap-16 items-center h-screen">
        <Image src={"/static/logo.svg"} alt="Logo" width="32px" height="26px" />
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
