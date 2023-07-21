import React from "react";
import * as S from "./TransactionHistory.styles";
import { Address } from "wagmi";
import { TransactionReceipt, decodeAbiParameters } from "viem";
import { useTheme } from "@mui/material";
import successTickIcon from "assets/icons/success-tick.svg";

interface TransactionHistoryProps {
    transactionData: TransactionReceipt | undefined;
};

function TransactionHistory ({
    transactionData
} : TransactionHistoryProps) {

    const theme = useTheme();
    
      return transactionData ? (
        <S.Container>
            <S.Details>
              <S.SuccessIndicator height={theme.spacing(8)} src={successTickIcon} alt='Success' />
              <S.Heading>Transaction details</S.Heading>
              <S.DetailsItem>
                <strong>Transaction address: </strong>
                {transactionData.transactionHash}
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
                <strong>Tokens transferred: </strong>
                {transactionData.logs[0]?.data &&
                  String(
                    decodeAbiParameters(
                      [
                        {
                          type: 'uint256',
                          name: 'amount',
                        },
                      ],
                      transactionData.logs[0]?.data,
                    ),
                  )}{' '}
                $PENG
              </S.DetailsItem>
              <S.DetailsItem>
                <strong>Recipient: </strong>
                {transactionData.logs[0]?.data &&
                  String(
                    decodeAbiParameters(
                      [
                        {
                          type: 'address',
                          name: 'to',
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
        ) : (
        <></>
      );
}

export default TransactionHistory;