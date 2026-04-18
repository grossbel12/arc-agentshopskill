"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, fallback } from "wagmi";
import { arcTestnet, RPC_URLS } from "@/lib/arc-chain";
import { env } from "@/lib/env";
import { queryClient } from "@/lib/wagmi";

function createTransport(url: string) {
  return http(url, {
    retryCount: 2,
    retryDelay: 500,
    timeout: 15_000,
  });
}

const wagmiConfig = getDefaultConfig({
  appName: "AgentShop",
  projectId: env.walletConnectProjectId || "arc-agentshop-dev",
  chains: [arcTestnet],
  wallets: undefined,
  transports: {
    [arcTestnet.id]: fallback(RPC_URLS.map(createTransport), {
      retryCount: 30,
    }),
  },
  ssr: true,
});

export function Providers({ children }: { readonly children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#00c97a",
            accentColorForeground: "#08130d",
            borderRadius: "medium",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
