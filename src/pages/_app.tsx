import { SocketProvider } from "@/context/SocketContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      <Toaster />
      </QueryClientProvider>
    </SocketProvider>
  );
}
