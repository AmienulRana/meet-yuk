import { SocketProvider } from "@/context/SocketContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SocketProvider>
  );
}
