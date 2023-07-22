import { contracts } from "contracts";
import * as S from "./styles";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Address, useContractEvent, useContractRead } from "wagmi";
import { Move } from "moves";

interface ContractData {
  abi: any;
  address: Address;
}

function GameSessionPage() {
  const { hash } = useParams();

  const rpslsGameContract = useState<ContractData>({
    abi: contracts.rpslsGame.abi,
    address: hash as Address,
  });
  console.log(hash);

  const { data: move2Data } = useContractRead({
    ...rpslsGameContract,
    functionName: "move2",
    watch: true,
  });

  const { data: stakeData } = useContractRead({
    ...rpslsGameContract,
    functionName: "stake",
    watch: true,
  });

  const { data: player1Data } = useContractRead({
    ...rpslsGameContract,
    functionName: "player1",
    watch: true,
  });

  const { data: player2Data } = useContractRead({
    ...rpslsGameContract,
    functionName: "player2",
    watch: true,
  });

  return <S.Container>
    <S.PlayerContainer>
      <S.DetailsItem><strong>Player1:</strong> {player1Data as Address}</S.DetailsItem>
    </S.PlayerContainer>
  </S.Container>;
}

export default GameSessionPage;
