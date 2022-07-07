import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChangedListener } from "../lib/firebase";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import { UserProvider } from "../contexts/user-context";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        if (router.pathname === "/login" || router.pathname === "/sign-up") {
          router.push("/", undefined, { scroll: false });
        }
      } else {
        if (!(router.pathname === "/login" || router.pathname === "/sign-up")) {
          router.push("/login", undefined, { scroll: false });
        }
      }
    });

    return unsubscribe;
  }, [router]);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
