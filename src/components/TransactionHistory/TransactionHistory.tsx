import React, { useContext, useEffect, useState } from "react";
import * as S from "./TransactionHistory.styles";
import { Address, useWaitForTransaction } from "wagmi";
import { Hash, decodeAbiParameters } from "viem";
import { useTheme } from "@mui/material";
import successTickIcon from "assets/icons/success-tick.svg";
import { AppContext } from "context/AppContext";
import { useNavigate } from "react-router-dom";

interface TransactionHistoryProps {
  transactionHash: Hash;
}

function TransactionHistory({ transactionHash : _transactionHash }: TransactionHistoryProps) {
  const theme = useTheme();

  const [transactionHash, setTransactionHash] = useState<Hash>(_transactionHash);

  const { setIsLoading, setErrorMessage } = useContext(AppContext);

  const {
    error,
    data: transactionData,
    isLoading: isTransactionDataLoading,
  } = useWaitForTransaction({
    hash: transactionHash,
    enabled: !!(transactionHash),
    onSuccess: (data) => {
      console.log(data)
    },
    onReplaced: (replacement) => {
      console.log({ replacement });
      if (replacement.reason === 'cancelled') {
        setErrorMessage?.(`Transaction ${transactionHash} was cancelled`);
        return;
      } else {
        setTransactionHash(replacement.transactionReceipt.transactionHash);
      }
    },
    onError: (err) => console.log({ err }),
    confirmations: 1
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading?.(isTransactionDataLoading);
  }, [isTransactionDataLoading]);

  useEffect(() => {
  }, [transactionData]);

  return isTransactionDataLoading ? (
    <>
      <S.Container>
        <S.Details>
          <S.Heading>Transaction pending</S.Heading>
          <S.DetailsItem>
            <strong>Transaction address: </strong>
            {transactionHash}
          </S.DetailsItem>
          <S.DetailsItem>
            <strong>Status: </strong>
            Pending
          </S.DetailsItem>
          <S.LoadingIconComponent variant="indeterminate" />
        </S.Details>
        <S.CutOffBorder />
      </S.Container>
    </>
  ) : transactionData?.status === 'success' && !error ? (
    <>
      <S.Container>
        <S.Details>
          <S.SuccessIndicator height={theme.spacing(4)} src={successTickIcon} alt='Success' />
          <S.Heading>Transaction details</S.Heading>
          <S.DetailsItem>
            <strong>Transaction address: </strong>
            {transactionData?.transactionHash}
          </S.DetailsItem>
          <S.DetailsItem>
            <strong>Gas used: </strong>
            {String(transactionData.gasUsed)}
          </S.DetailsItem>
          <S.DetailsItem>
            <strong>Gas price: </strong>
            {String(transactionData.effectiveGasPrice)} WEI
          </S.DetailsItem>
          <S.DetailsItem>
            <strong>Recipient: </strong>
            {transactionData.logs[0]?.data &&
              String(
                decodeAbiParameters(
                  [
                    {
                      type: 'address',
                      name: 'player2',
                    },
                  ],
                  transactionData.logs[0].topics[2] as Address,
                ),
              )}
          </S.DetailsItem>
          <S.DetailsItem>
            <strong>Status: </strong>
            {transactionData.status.charAt(0).toUpperCase()}
            {transactionData.status.slice(1)}
          </S.DetailsItem>
        </S.Details>
        <S.CutOffBorder />
      </S.Container>
      <S.GameButtonsContainer>
        <S.InviteOpponentButton onClick={() => {
        navigator.clipboard.writeText(`${window.location.hostname}/game-session/${transactionHash}`);
      }}>Copy opponent's invitation link</S.InviteOpponentButton>
      <S.GoToSolveGameButton onClick={() => navigate(`/game-session/${transactionHash}`)}>Go to game session</S.GoToSolveGameButton>
      </S.GameButtonsContainer>
    </>
  ) : (
    <></>
  );
}

export default TransactionHistory;
