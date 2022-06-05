import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import { onAuthStateChangedListener } from "../lib/firebase";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        console.log("Signed In");
        if (router.pathname === "/login" || router.pathname === "/sign-up") {
          router.push("/");
        }
      } else {
        console.log("Signed Out");
        if (!(router.pathname === "/login" || router.pathname === "/sign-up")) {
          router.push("/login");
        }
      }
    });

    return unsubscribe;
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
