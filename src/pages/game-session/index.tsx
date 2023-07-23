import { contracts } from "contracts";
import * as S from "./styles";
import hiddenMoveIcon from "assets/icons/moves/hidden-move.gif";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Address, useAccount, useContractEvent, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { Move, moveIcons, moves } from "moves";
import { formatEther } from "viem";
import { useTimer } from 'react-timer-hook';
import { AppContext } from "context/AppContext";
import { useLocalStorage } from "react-use";


interface ContractData {
  abi: any;
  address: Address;
}

const formatTime = (time : number) : string => time < 10 ? `0${time}` : `${time}`; 

function GameSessionPage() {
  const { hash } = useParams();

  const rpslsGameContract : ContractData = {
    abi: contracts.rpslsGame.abi,
    address: hash as Address,
  };

  const { data: move2 } = useContractRead({
    ...rpslsGameContract,
    functionName: "move2",
    watch: true,
  });

  const { data: stake } = useContractRead({
    ...rpslsGameContract,
    functionName: "stake",
    watch: true,
  });

  const { data: player1 } = useContractRead({
    ...rpslsGameContract,
    functionName: "player1",
    watch: true,
  });

  const { data: lastTimePlayed } = useContractRead({
    ...rpslsGameContract,
    functionName: "lastTimePlayed",
    watch: true,
  });

  const { data: TIMEOUT_IN_MS } = useContractRead({
    ...rpslsGameContract,
    functionName: "TIMEOUT_IN_MS"
  });

  const { data: player2 } = useContractRead({
    ...rpslsGameContract,
    functionName: "player2",
    watch: true,
  });

  useEffect(() => {
    console.log({
      TIMEOUT_IN_MS,
      lastTimePlayed
    });
  }, [TIMEOUT_IN_MS, lastTimePlayed]);

  const { setIsLoading } = useContext(AppContext);

  const [isEligibleForTimeout, setIsEligibleForTimeout] = useState<boolean>(false);

  const { isLoading: claimTimeoutLoading, write : claimTimeout, data : claimTimeoutTransactionData } = useContractWrite({
    ...rpslsGameContract,
    functionName: "claimTimeout"
  });

  const { address } = useAccount();

  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const { isLoading: claimTimeoutTransactionLoading } = useWaitForTransaction({
    hash: claimTimeoutTransactionData?.hash,
    onSuccess: () => setSuccessMessage("Timeout claimed successfully")
  });

  useEffect(() => {
    setIsLoading?.(claimTimeoutLoading || claimTimeoutTransactionLoading);
  }, [claimTimeoutLoading, claimTimeoutTransactionLoading]);

  const {
    seconds,
    minutes
  } = useTimer({ 
    expiryTimestamp: new Date(((Number(lastTimePlayed) as unknown as number) + (Number(TIMEOUT_IN_MS) as unknown as number))),
    autoStart: true,
    onExpire: () => setIsEligibleForTimeout(true)
  });

  const [selectedMove, setSelectedMove] = useState<Move>(Move.Null);

  const { write : submitMove, isLoading: isSubmitMoveLoading, data : submitMoveData } = useContractWrite({
    ...rpslsGameContract,
    functionName: "play",
    args: [selectedMove],
    value: stake as unknown as bigint
  });

  const { isLoading: isSubmitMoveTransactionLoading } = useWaitForTransaction({
    hash: submitMoveData?.hash,
    onSuccess: () => setSuccessMessage('Move submitted successfully!')
  });

  const [salt] = useLocalStorage<string>("salt");
  const [move1] = useLocalStorage<string>("move1");

  const { write : solveGame, isLoading: isSolveGameLoading, data : solveGameData } = useContractWrite({
    ...rpslsGameContract,
    functionName: "solve",
    args: [salt, Number(move1)]
  });

  const { isLoading: isSolveGameTransactionLoading } = useWaitForTransaction({
    hash: solveGameData?.hash,
    onSuccess: () => setSuccessMessage('Game solved successfully. See the winner! 🎊🎉')
  });

  return stake && player1 ? <S.Container>
    { player2 === address ? <S.MovesContainer>
      {moves.map((move : Move) => <S.MoveItem className={move === selectedMove ? "selected" : ""} onClick={() => setSelectedMove(move)}>
        <img src={moveIcons[move - 1]} alt={`Move №${move}`} />
      </S.MoveItem>
      )}
    </S.MovesContainer> : <></>}
    <S.PlayerContainer>
      <S.DetailsItem>
        <strong>Player 1: </strong>
        <span>{player1 as unknown as Address}</span>
      </S.DetailsItem>
      <S.DetailsItem>
        <strong>Player 2: </strong>
        <span>{player2 as unknown as Address}</span>
      </S.DetailsItem>
      <S.DetailsItem>
        <strong>Stake details: </strong>
        <span>{formatEther(stake as unknown as bigint)} ETH</span>
      </S.DetailsItem>
      <S.DetailsItem>
        <strong>Time until timeout: </strong>
        <span>{formatTime(minutes)}::{formatTime(seconds)}</span>
      </S.DetailsItem>
      <S.DetailsItem>
        <strong>Player 1's move: </strong>
        <S.HiddenMoveImage src={hiddenMoveIcon} alt="?" />
      </S.DetailsItem>
      <S.DetailsItem>
        <strong>Player 2's move: </strong>
        { player2 === address && !move2 ? <S.SubmitMoveButton disabled={selectedMove === Move.Null} onClick={() => submitMove?.()} loading={isSubmitMoveLoading || isSubmitMoveTransactionLoading}>Submit move</S.SubmitMoveButton> : ((move2 as unknown as Move) === Move.Null) ? <span>Move not submitted</span> : <S.MoveImage alt="Player 2's move" src={moveIcons[(move2 as unknown as Move) - 1]} /> }
      </S.DetailsItem>
    </S.PlayerContainer>
    { ((player2  as unknown as Address) === address && move2 && isEligibleForTimeout || (player1 as unknown as Address) === address && !move2) ? <S.TimeoutButton loading={claimTimeoutLoading || claimTimeoutTransactionLoading} onClick={() => claimTimeout?.()}>Claim timeout</S.TimeoutButton> : <></>}
    {((player1 as unknown as Address) === address) && move2 ? <S.SolveButton loading={isSolveGameTransactionLoading || isSolveGameLoading} onClick={() => solveGame?.()}>Solve game</S.SolveButton> : <></>}
    { successMessage ? <S.SuccessBox>{successMessage}</S.SuccessBox> : <></> }
  </S.Container>: <></>;
}

export default GameSessionPage;
