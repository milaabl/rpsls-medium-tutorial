import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
  useAccount,
} from "wagmi";
import { useLocalStorage } from "react-use";
import * as S from "./styles";
import { moves, moveIcons, Move } from "moves";
import { contracts } from "contracts";
import { TransactionReceipt, encodePacked, keccak256, parseEther } from "viem";
import { AppContext } from "context/AppContext";
import TransactionHistory from "components/TransactionHistory/TransactionHistory";

function NewGamePage() {
  const { address } = useAccount();

  const [player2, setPlayer2] = useState<string | undefined>();
  const [bid, setBid] = useState<string>("0");

  const [move1Hash, setMove1Hash] = useState<string | undefined>(undefined);
  const [, setSalt] = useLocalStorage("salt");

  const [selectedMove, setSelectedMove] = useState<Move>(Move.Null);

  const { data : createNewGameSessionData, write: createNewGameSession } = useContractWrite({
    ...contracts.factory,
    functionName: "createGameSession",
    args: [move1Hash, player2],
    value: parseEther(bid)
  });

  const { isLoading, data : newGameTxData, error } = useWaitForTransaction({
    hash: createNewGameSessionData?.hash
  });

  const { setErrorMessage, setIsLoading } = useContext(AppContext);

  const [_newGameTxData, _setNewGameTxData] = useLocalStorage('gameTxData', newGameTxData, {
    raw: false,
    serializer: (value : TransactionReceipt) => JSON.stringify(value),
    deserializer: (value : string) => JSON.parse(value)
  });

  useEffect(() => {
    error?.message && setErrorMessage?.(error.message);
  }, [error?.message]);

  useEffect(() => {
    setIsLoading?.(isLoading);
  }, [isLoading]);

  useEffect(() => {
    _setNewGameTxData(newGameTxData);
  }, [newGameTxData]);

  return (
    <S.Container>
      <S.MovesContainer>
        {moves.map((move: Move) => (
          <S.MoveItem
            className={selectedMove === move ? "selected" : ""}
            onClick={() => setSelectedMove(move)}
          >
            <img src={moveIcons[move - 1]} alt={`Move №${move}`} />
          </S.MoveItem>
        ))}
      </S.MovesContainer>
      <S.Heading>Create a new game session 🎮</S.Heading>
      <S.Form>
        <S.Input>
          <S.TextField
            inputProps={{
              maxLength: 42,
            }}
            InputLabelProps={{ shrink: true }}
            label="Address of player2's wallet"
            helperText="Invite your opponent 🪖"
            value={player2}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
              setPlayer2(value)
            }
          />
          <S.PasteWalletAddressButton
            label="Paste"
            onClick={() => {
              navigator.clipboard.readText().then((value) => setPlayer2(value));
            }}
          />
        </S.Input>
        <S.Input>
          <S.TextField
            inputProps={{
              step: "0.01",
            }}
            type="number"
            label="Bid (in ETH)"
            helperText="Please enter the bid 🎲 for the game"
            value={bid}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
              setBid(value)
            }
          />
        </S.Input>
      </S.Form>
      <S.SubmitButton
        disabled={
          !(address && selectedMove !== Move.Null && player2 && Number(bid) > 0)
        }
        onClick={() => {
          const array = new Uint8Array(32);
          const salt = crypto
            .getRandomValues(array)
            .reduce((prev, curr) => prev + curr, 0);
          setSalt(String(salt));

          const _move1Hash = keccak256(
            encodePacked(["uint8", "uint256"], [selectedMove, BigInt(salt)]),
          );

          setMove1Hash(_move1Hash);

          console.log(createNewGameSession)

          createNewGameSession?.();
        }}
      >
        Submit session ✅
      </S.SubmitButton>
      { newGameTxData || _newGameTxData ? <TransactionHistory transactionData={newGameTxData || _newGameTxData} /> : <></>}
    </S.Container>
  );
}

export default NewGamePage;
