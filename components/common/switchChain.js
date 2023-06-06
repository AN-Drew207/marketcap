import Web3 from "web3";

export const switchChain = async (network, networkName, provider) => {
  try {
    const changed = await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0x" + parseInt(network).toString(16),
        },
      ],
    });
    console.log(changed, "changed blockchain");
  } catch (err) {
    console.log({ err });
  }
};
