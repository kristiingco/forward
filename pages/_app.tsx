import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChangedListener } from "../lib/firebase";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Loading from "../components/Loading";

import { UserProvider } from "../contexts/user-context";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        if (router.pathname === "/login" || router.pathname === "/sign-up") {
          router.push("/");
        }
      } else {
        if (!(router.pathname === "/login" || router.pathname === "/sign-up")) {
          router.push("/login");
        }
      }
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <UserProvider>
      {loading ? <Loading /> : <Component {...pageProps} />}
    </UserProvider>
  );
}

export default MyApp;
