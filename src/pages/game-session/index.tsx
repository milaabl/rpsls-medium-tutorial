import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';

import { Typography } from '@mui/material';
import { formatEther } from 'viem';
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import hiddenMoveIcon from '../../assets/icons/moves/hidden-move.gif';
import { AppContext } from '../../context/AppContext';
import { contracts } from '../../contracts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Move, moveIcons, moves } from '../../moves';
import * as S from './styles';

const formatTime = (time: number): string =>
  time < 10 ? `0${time}` : `${time}`;

function GameSessionPage() {
  const { hash } = useParams<{ hash: Address }>();

  const rpslsGameContract = useMemo(
    () => ({
      abi: contracts.rpslsGame.abi,
      address: hash,
    }),
    [hash],
  );

  const { data: move2 } = useContractRead({
    ...rpslsGameContract,
    functionName: 'move2',
    watch: true,
  });

  const { data: stake } = useContractRead({
    ...rpslsGameContract,
    functionName: 'stake',
    watch: true,
  });

  const { data: player1 } = useContractRead({
    ...rpslsGameContract,
    functionName: 'player1',
    watch: true,
  });

  const { data: lastTimePlayed } = useContractRead({
    ...rpslsGameContract,
    functionName: 'lastTimePlayed',
    watch: true,
  });

  const { data: TIMEOUT_IN_MS } = useContractRead({
    ...rpslsGameContract,
    functionName: 'TIMEOUT_IN_MS',
  });

  const { data: player2 } = useContractRead({
    ...rpslsGameContract,
    functionName: 'player2',
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
    functionName: 'claimTimeout',
  });

  const { address } = useAccount();

  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const { isLoading: claimTimeoutTransactionLoading } = useWaitForTransaction({
    hash: claimTimeoutTransactionData?.hash,
    onSuccess: () => setSuccessMessage('Timeout claimed successfully'),
  });

  useEffect(() => {
    setIsLoading?.(claimTimeoutLoading || claimTimeoutTransactionLoading);
  }, [claimTimeoutLoading, claimTimeoutTransactionLoading]);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: new Date(
      (Number(lastTimePlayed || 0) + Number(TIMEOUT_IN_MS || 0)) * 1000, // Convert Epoch timestamp to ms (https://dev.to/iamephraim/how-to-convert-epoch-timestamp-to-date-using-javascript-352f)
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
    functionName: 'play',
    args: [selectedMove],
    value: stake || BigInt(0),
  });

  const { isLoading: isSubmitMoveTransactionLoading } = useWaitForTransaction({
    hash: submitMoveData?.hash,
    onSuccess: () => setSuccessMessage('Move submitted successfully!'),
  });

  const [salt] = useLocalStorage(`salt-${hash}`);
  const [move1] = useLocalStorage(`move-${hash}`);

  const {
    write: solveGame,
    isLoading: isSolveGameLoading,
    data: solveGameData,
  } = useContractWrite({
    ...rpslsGameContract,
    functionName: 'solve',
    args: [Number(move1), String(salt)],
  });

  const { isLoading: isSolveGameTransactionLoading } = useWaitForTransaction({
    hash: solveGameData?.hash,
    onSuccess: () =>
      setSuccessMessage('Game solved successfully. See the winner! 🎊🎉'),
  });

  const { data: isPlayer1Winner } = useContractRead({
    ...rpslsGameContract,
    functionName: 'win',
    args: [Number(move1), Number(move2)],
    enabled: Number(move1) !== Move.Null && Number(move2) !== Move.Null,
  });

  const { data: isPlayer2Winner } = useContractRead({
    ...rpslsGameContract,
    functionName: 'win',
    args: [Number(move2), Number(move1)],
    enabled: Number(move1) !== Move.Null && Number(move2) !== Move.Null,
  });

  useEffect(() => {
    if (!TIMEOUT_IN_MS || !lastTimePlayed) return;

    restart(
      new Date(
        (Number(lastTimePlayed || 0) + Number(TIMEOUT_IN_MS || 0)) * 1000,
      ),
    );
  }, [TIMEOUT_IN_MS, lastTimePlayed]);

  return player1 && (stake || !move2) ? (
    <S.Container>
      {player2 === address ? (
        <S.MovesContainer>
          {moves.map((move: Move) => (
            <S.MoveItem
              className={move === selectedMove ? 'selected' : ''}
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
          <span>{player1}</span>
        </S.DetailsItem>
        <S.DetailsItem>
          <strong>Player 2: </strong>
          <span>{player2}</span>
        </S.DetailsItem>
        <S.DetailsItem>
          <strong>Stake details: </strong>
          <span>{stake ? formatEther(stake) : 0} ETH</span>
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
              onClick={() => stake && submitMove?.()}
              loading={isSubmitMoveLoading || isSubmitMoveTransactionLoading}
            >
              Submit move
            </S.SubmitMoveButton>
          ) : move2 ? (
            <S.MoveImage alt="Player 2's move" src={moveIcons[move2 - 1]} />
          ) : (
            <span>Move not submitted</span>
          )}
        </S.DetailsItem>
      </S.PlayerContainer>
      {(player2 === address && move2 && isEligibleForTimeout) ||
      (isEligibleForTimeout && player1 === address && !move2) ? (
        <S.TimeoutButton
          loading={claimTimeoutLoading || claimTimeoutTransactionLoading}
          onClick={() => claimTimeout?.()}
        >
          Claim timeout
        </S.TimeoutButton>
      ) : (
        <></>
      )}
      {player1 === address && move2 ? (
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
        {isPlayer1Winner === false ? (
          <strong>Player2: {player2}</strong>
        ) : isPlayer2Winner === false ? (
          <strong>Player 1: {player1}</strong>
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
