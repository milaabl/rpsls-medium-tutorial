import { contracts } from "contracts";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Address, useContractEvent, useContractRead } from "wagmi";

interface ContractData {
  abi: any,
  address: Address
}

function GameSessionPage() {
  const {hash} = useParams();

  const rpslsGameContract = useState<ContractData>({
    abi: contracts.rpslsGame.abi,
    address: hash as Address,
  });
  console.log(hash);

  const { data : move2Data } = useContractRead({
    ...rpslsGameContract,
    functionName: 'move2',
    watch: true
  });

  const { data : stakeData } = useContractRead({
    ...rpslsGameContract,
    functionName: 'stake',
    watch: true
  });

  return <></>;
}

export default GameSessionPage;
