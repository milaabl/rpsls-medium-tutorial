import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
  useAccount,
  useTransaction,
} from "wagmi";
import { useLocalStorage } from "react-use";
import * as S from "./styles";
import { moves, moveIcons, Move } from "moves";
import { contracts } from "contracts";
import { TransactionReceipt, encodePacked, keccak256, parseEther } from "viem";
import { AppContext } from "context/AppContext";
import TransactionHistory from "components/TransactionHistory/TransactionHistory";
import { validateAddress } from "utils/validators";

function NewGamePage() {
  const { address } = useAccount();

  const [player2, setPlayer2] = useState<string | undefined>();
  const [bid, setBid] = useState<string>("0");

  const [, setSalt] = useLocalStorage("salt");
  const [, setMove1] = useLocalStorage("move1");

  const [selectedMove, setSelectedMove] = useState<Move>(Move.Null);

  const [isMoveCommitted, setIsMoveCommitted] = useState<boolean>(false);


    const { error, isLoading : isNewGameSessionLoading, write : createNewGameSession, data: createNewGameSessionData } = useContractWrite({
      ...contracts.factory,
      functionName: "createGameSession",
      value: parseEther(bid),
    });

    useEffect(() => {
      if (createNewGameSessionData?.hash && !error) {
        setIsMoveCommitted(true);
      }
    }, [createNewGameSessionData?.hash]);

  const { setErrorMessage, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    error?.message && setErrorMessage?.(error.message);
  }, [error?.message]);

  useEffect(() => {
    setIsLoading?.(isNewGameSessionLoading);
  }, [isNewGameSessionLoading]);

  return (!isMoveCommitted ? <S.Container>
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
        disabled={!(address && selectedMove !== Move.Null && Number(bid) > 0 && validateAddress(player2))}
        onClick={() => {
          const array = new Uint8Array(32);
          const salt = crypto
            .getRandomValues(array)
            .reduce((prev, curr) => prev + curr, 0);

          const _move1Hash = keccak256(
            encodePacked(["uint8", "uint256"], [selectedMove, BigInt(salt)]),
          );

          setSalt(String(salt));
          setMove1(selectedMove);

          createNewGameSession({
            args: [_move1Hash, player2]
          });
        }}
      >
        Submit session ✅
      </S.SubmitButton>
      </S.Container> : createNewGameSessionData?.hash ? (
        <TransactionHistory transactionHash={createNewGameSessionData?.hash} />
      ) : <></>);
}

export default NewGamePage;
