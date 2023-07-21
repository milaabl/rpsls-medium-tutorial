import { configureChains, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
 
const { chains, publicClient } = configureChains(
  [sepolia],
  [publicProvider()]
)

const connector = new InjectedConnector({
  chains,
})

export const wagmiConfig = createConfig({
  publicClient,
  connectors: [connector],
  autoConnect: true,
});