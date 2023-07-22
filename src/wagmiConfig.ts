import { configureChains, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
 
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({
    apiKey: "t8xyaDtb1Xg-Rub8BOA-us_SGyt2pBd4"
  })]
)

const connector = new MetaMaskConnector({
  chains,
})

export const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  connectors: [connector]
});