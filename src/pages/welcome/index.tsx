import { contracts } from "contracts";
import React from "react";
import { Hash } from "viem";
import { useWalletClient, useContractRead } from "wagmi";

function WelcomePage() {
  const { data: walletClient } = useWalletClient()
  const { data : availableGameSessions } = useContractRead({
    ...contracts.factory,
    functionName: 'getGameSessions',
    account: walletClient?.account,
    watch: true
  });
  console.log(availableGameSessions);

  return availableGameSessions ? <div>{
    (availableGameSessions as Array<Hash>).join(",")}
    </div> : <></>;
}

export default WelcomePage;
