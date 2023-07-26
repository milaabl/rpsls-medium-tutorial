import { contracts } from "contracts";
import * as S from "./styles";
import hiddenMoveIcon from "assets/icons/moves/hidden-move.gif";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Move, moveIcons, moves } from "moves";
import { formatEther } from "viem";
import { useTimer } from "react-timer-hook";
import { AppContext } from "context/AppContext";
import { useLocalStorage } from "hooks/useLocalStorage";
import { Typography } from "@mui/material";

interface ContractData {
  abi: any;
  address: Address;
}

const formatTime = (time: number): string =>
  time < 10 ? `0${time}` : `${time}`;

function GameSessionPage() {
  const { hash } = useParams();

  const rpslsGameContract: ContractData = {
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
    functionName: "TIMEOUT_IN_MS",
  });

  const { data: player2 } = useContractRead({
    ...rpslsGameContract,
    functionName: "player2",
    watch: true,
  });

  const { setIsLoading } = useContext(AppContext);

  const [isEligibleForTimeout, setIsEligibleForTimeout] =
    useState<boolean>(false);

  const {
    isLoading: claimTimeoutLoading,
    write: claimTimeout,
    data: claimTimeoutTransactionData,
  } = useContractWrite({
    ...rpslsGameContract,
    functionName: "claimTimeout",
  });

  const { address } = useAccount();

  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const { isLoading: claimTimeoutTransactionLoading } = useWaitForTransaction({
    hash: claimTimeoutTransactionData?.hash,
    onSuccess: () => setSuccessMessage("Timeout claimed successfully"),
  });

  useEffect(() => {
    setIsLoading?.(claimTimeoutLoading || claimTimeoutTransactionLoading);
  }, [claimTimeoutLoading, claimTimeoutTransactionLoading]);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: new Date(
      ((Number(lastTimePlayed || 0) as unknown as number) +
        (Number(TIMEOUT_IN_MS || 0) as unknown as number)) *
        1000,
    ),
    autoStart: true,
    onExpire: () => setIsEligibleForTimeout(true),
  });

  const [selectedMove, setSelectedMove] = useState<Move>(Move.Null);

  const {
    write: submitMove,
    isLoading: isSubmitMoveLoading,
    data: submitMoveData,
  } = useContractWrite({
    ...rpslsGameContract,
    functionName: "play",
    args: [selectedMove],
    value: stake as unknown as bigint,
  });

  const { isLoading: isSubmitMoveTransactionLoading } = useWaitForTransaction({
    hash: submitMoveData?.hash,
    onSuccess: () => setSuccessMessage("Move submitted successfully!"),
  });

  const [salt] = useLocalStorage(`salt-${hash}`);
  const [move1] = useLocalStorage(`move-${hash}`);

  const {
    write: solveGame,
    isLoading: isSolveGameLoading,
    data: solveGameData,
  } = useContractWrite({
    ...rpslsGameContract,
    functionName: "solve",
    args: [Number(move1), salt],
  });

  const { isLoading: isSolveGameTransactionLoading } = useWaitForTransaction({
    hash: solveGameData?.hash,
    onSuccess: () =>
      setSuccessMessage("Game solved successfully. See the winner! 🎊🎉"),
  });

  const { data: isPlayer1Winner } = useContractRead({
    ...rpslsGameContract,
    functionName: "win",
    args: [move1, move2],
    enabled: Number(move1) !== Move.Null && Number(move2) !== Move.Null,
  });

  const { data: isPlayer2Winner } = useContractRead({
    ...rpslsGameContract,
    functionName: "win",
    args: [move2, move1],
    enabled: Number(move1) !== Move.Null && Number(move2) !== Move.Null,
  });

  useEffect(() => {
    if (!TIMEOUT_IN_MS || !lastTimePlayed) return;

    restart(
      new Date(
        ((Number(lastTimePlayed || 0) as unknown as number) +
          (Number(TIMEOUT_IN_MS || 0) as unknown as number)) *
          1000,
      ),
    );
  }, [TIMEOUT_IN_MS, lastTimePlayed]);

  return player1 && (stake || !move2) ? (
    <S.Container>
      {player2 === address ? (
        <S.MovesContainer>
          {moves.map((move: Move) => (
            <S.MoveItem
              className={move === selectedMove ? "selected" : ""}
              onClick={() => setSelectedMove(move)}
            >
              <img src={moveIcons[move - 1]} alt={`Move №${move}`} />
            </S.MoveItem>
          ))}
        </S.MovesContainer>
      ) : (
        <></>
      )}
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
          <span>
            {formatTime(minutes)}::{formatTime(seconds)}
          </span>
        </S.DetailsItem>
        <S.DetailsItem>
          <strong>Player 1's move: </strong>
          <S.HiddenMoveImage src={hiddenMoveIcon} alt="?" />
        </S.DetailsItem>
        <S.DetailsItem>
          <strong>Player 2's move: </strong>
          {player2 === address && !move2 ? (
            <S.SubmitMoveButton
              disabled={selectedMove === Move.Null}
              onClick={() => submitMove?.()}
              loading={isSubmitMoveLoading || isSubmitMoveTransactionLoading}
            >
              Submit move
            </S.SubmitMoveButton>
          ) : (move2 as unknown as Move) === Move.Null ? (
            <span>Move not submitted</span>
          ) : (
            <S.MoveImage
              alt="Player 2's move"
              src={moveIcons[(move2 as unknown as Move) - 1]}
            />
          )}
        </S.DetailsItem>
      </S.PlayerContainer>
      {((player2 as unknown as Address) === address &&
        move2 &&
        isEligibleForTimeout) ||
      (isEligibleForTimeout &&
        (player1 as unknown as Address) === address &&
        !move2) ? (
        <S.TimeoutButton
          loading={claimTimeoutLoading || claimTimeoutTransactionLoading}
          onClick={() => claimTimeout?.()}
        >
          Claim timeout
        </S.TimeoutButton>
      ) : (
        <></>
      )}
      {(player1 as unknown as Address) === address && move2 ? (
        <S.SolveButton
          loading={isSolveGameTransactionLoading || isSolveGameLoading}
          onClick={() => solveGame?.()}
        >
          Solve game
        </S.SolveButton>
      ) : (
        <></>
      )}
      {successMessage ? <S.SuccessBox>{successMessage}</S.SuccessBox> : <></>}
    </S.Container>
  ) : player1 && move2 ? (
    <S.GameSolvedContainer>
      <Typography variant="h3">Game solved successfully!</Typography>
      <S.GameSolvedTitle variant="h4">
        <S.HighlightContainer>The winner is:</S.HighlightContainer>
      </S.GameSolvedTitle>
      <Typography variant="h6">
        {(isPlayer1Winner as unknown as boolean) === false ? (
          <strong>Player2: {player2 as unknown as Address}</strong>
        ) : (isPlayer2Winner as unknown as boolean) === false ? (
          <strong>Player 1: {player1 as unknown as Address}</strong>
        ) : (
          <strong>Everyone winned. Game tied! 🪢</strong>
        )}
      </Typography>
    </S.GameSolvedContainer>
  ) : (
    <></>
  );
}

export default GameSessionPage;
