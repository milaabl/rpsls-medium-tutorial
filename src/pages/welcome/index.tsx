import { AppContext } from "context/AppContext";
import * as S from "./styles";
import { contracts } from "contracts";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Abi, Hash, MulticallResult } from "viem";
import { useWalletClient, useContractRead, useContractReads } from "wagmi";

function WelcomePage() {
  const { data: walletClient } = useWalletClient();
  const { isLoading, data: availableGameSessions } = useContractRead({
    ...contracts.factory,
    functionName: "getGameSessions",
    account: walletClient?.account,
    watch: true,
    select: (data: any) => {
      return data as Array<Hash>;
    },
  });

  const [activeGameSessions, setActiveSessions] = useState<Array<Hash>>([]);

  const { isLoading: isGameStakesLoading } = useContractReads({
    contracts: (availableGameSessions as Array<Hash>)?.map(
      (gameSession: Hash) => {
        return {
          address: gameSession,
          functionName: "stake",
          abi: contracts.rpslsGame.abi as Abi,
        };
      },
    ),
    onSuccess: (data) => {
      const contractStakes = (
        data as unknown as Array<MulticallResult<bigint>>
      ).map((result: MulticallResult<bigint>) => result.result);
      contractStakes.forEach(
        (contractStake: bigint | undefined, index: number) => {
          if (
            Number(contractStake as unknown as bigint) > 0 &&
            availableGameSessions?.[index]
          ) {
            setActiveSessions((prev: Array<Hash>) =>
              Array.from(new Set([...prev, availableGameSessions[index]])),
            );
          }
        },
      );
    },
    watch: true,
  });

  const navigate = useNavigate();

  const { setIsLoading } = useContext(AppContext);

  useEffect(() => {
    setIsLoading?.(isLoading || isGameStakesLoading);
  }, [isLoading, isGameStakesLoading]);

  return activeGameSessions &&
    (activeGameSessions as Array<Hash>)?.length >= 1 ? (
    <S.Container>
      {(activeGameSessions as Array<Hash>).map((hash: Hash) => (
        <S.LinkToSession onClick={() => navigate(`/game-session/${hash}`)}>
          <span>{hash}</span>
          <S.ArrowRightButton />
        </S.LinkToSession>
      ))}
      <S.NewGameSessionLink onClick={() => navigate("/new-game")}>
        Propose new game session
      </S.NewGameSessionLink>
    </S.Container>
  ) : (
    <S.NoAvailableGameSessions>
      <S.NoAvailableGameSessionsLabel>
        There're no available active game sessions for you yet. Propose a new
        game session or get invited to join one!
      </S.NoAvailableGameSessionsLabel>
      <S.NewGameSessionLink onClick={() => navigate("/new-game")}>
        Propose new game session
      </S.NewGameSessionLink>
    </S.NoAvailableGameSessions>
  );
}

export default WelcomePage;
