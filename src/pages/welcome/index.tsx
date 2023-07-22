import { AppContext } from "context/AppContext";
import * as S from "./styles";
import { contracts } from "contracts";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hash } from "viem";
import { useWalletClient, useContractRead } from "wagmi";

function WelcomePage() {
  const { data: walletClient } = useWalletClient()
  const { isLoading, data : availableGameSessions } = useContractRead({
    ...contracts.factory,
    functionName: 'getGameSessions',
    account: walletClient?.account,
    watch: true
  });

  const navigate = useNavigate();

  const { setIsLoading } = useContext(AppContext);

  useEffect(() => {
    setIsLoading?.(isLoading);
  }, [isLoading]);

  return availableGameSessions ? <S.Container>{
    (availableGameSessions as Array<Hash>).map((hash : Hash) => <S.LinkToSession onClick={() => navigate(`/game-session/${hash}`)}>
      {hash}
      </S.LinkToSession>)}
    </S.Container> : <S.NoAvailableGameSessions>
      <S.NoAvailableGameSessionsLabel>
        There're no available game sessions for you yet. Propose a new game session or get invited to join one!
      </S.NoAvailableGameSessionsLabel>
      <S.NewGameSessionLink onClick={() => navigate('/new-game')}>Propose new game session</S.NewGameSessionLink></S.NoAvailableGameSessions>;
}

export default WelcomePage;
