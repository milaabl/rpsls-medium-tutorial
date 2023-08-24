import React, { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Hash } from 'viem';
import { useContractRead, useContractReads, useWalletClient } from 'wagmi';

import { AppContext } from '../../context/AppContext';
import { contracts } from '../../contracts';
import * as S from './styles';

const WelcomePage: FC = () => {
  const { data: walletClient } = useWalletClient();
  const { isLoading, data: availableGameSessions } = useContractRead({
    ...contracts.factory,
    functionName: 'getGameSessions',
    account: walletClient?.account,
    watch: true,
  });
  const { data: activeGameSessions, isLoading: isGameStakesLoading } =
    useContractReads({
      contracts: availableGameSessions?.map((gameSession: Hash) => {
        return {
          address: gameSession,
          functionName: 'stake',
          abi: contracts.rpslsGame.abi,
        };
      }),
      select: (data) => {
        if (!availableGameSessions) return [];

        return data
          .filter((session) => Number(session.result) > 0)
          .map((_, index) => availableGameSessions[index]);
      },
      watch: true,
    });

  const navigate = useNavigate();

  const { setIsLoading } = useContext(AppContext);

  useEffect(() => {
    setIsLoading?.(isLoading || isGameStakesLoading);
  }, [isLoading, isGameStakesLoading]);

  return activeGameSessions && activeGameSessions?.length >= 1 ? (
    <S.Container>
      {activeGameSessions.map((hash: Hash) => (
        <S.LinkToSession onClick={() => navigate(`/game-session/${hash}`)}>
          <span>{hash}</span>
          <S.ArrowRightButton />
        </S.LinkToSession>
      ))}
      <S.NewGameSessionLink onClick={() => navigate('/new-game')}>
        Propose new game session
      </S.NewGameSessionLink>
    </S.Container>
  ) : (
    <S.NoAvailableGameSessions>
      <S.NoAvailableGameSessionsLabel>
        There're no available active game sessions for you yet. Propose a new
        game session or get invited to join one!
      </S.NoAvailableGameSessionsLabel>
      <S.NewGameSessionLink onClick={() => navigate('/new-game')}>
        Propose new game session
      </S.NewGameSessionLink>
    </S.NoAvailableGameSessions>
  );
};

export default WelcomePage;
