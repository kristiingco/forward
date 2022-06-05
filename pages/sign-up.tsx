import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SignUpForm from "../components/SignUpForm";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const SignUp: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forward | Sign Up</title>
        <meta name="description" content="Entertainment Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        className="flex flex-col justify-center gap-16 items-center h-screen"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "linear" }}
      >
        <Image src={"/static/logo.svg"} alt="Logo" width="32px" height="26px" />
        <SignUpForm />
      </motion.main>
    </div>
  );
};

export default SignUp;
