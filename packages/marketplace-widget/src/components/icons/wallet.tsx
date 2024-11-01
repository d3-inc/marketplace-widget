const walletConnect = 'https://cdn.d3.app/assets/widgets/walletconnect.png';
const coinbase = 'https://cdn.d3.app/assets/widgets/coinbase.png';
const metamask = 'https://cdn.d3.app/assets/widgets/metamask.png';

export const WalletConnectIcon = ({ width = 32, height = 32 }) => {
  return <img src={walletConnect} width={width} height={height} alt="WalletConnect" />;
};

export const CoinbaseWalletIcon = ({ width = 32, height = 32 }) => {
  return <img src={coinbase} width={width} height={height} alt="Coinbase Wallet" />;
};

export const MetaMaskWalletIcon = ({ width = 32, height = 32 }) => {
  return <img src={metamask} width={width} height={height} alt="metamask Wallet" />;
};
