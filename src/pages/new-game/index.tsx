import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

import { isAddress } from 'viem';
import { Address, Hash, encodePacked, keccak256, parseEther } from 'viem';
import { useAccount, useContractWrite, useSignMessage } from 'wagmi';

import TransactionHistory from '../../components/TransactionHistory/TransactionHistory';
import { AppContext } from '../../context/AppContext';
import { contracts } from '../../contracts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Move, moveIcons, moves } from '../../moves';
import { validateAddress } from '../../utils/validators';
import * as S from './styles';

function NewGamePage() {
  const { address } = useAccount();

  const [player2, setPlayer2] = useState<Address | undefined>();
  const [bid, setBid] = useState<string>('0');

  const [, setSalt] = useLocalStorage('salt');
  const [, setMove1] = useLocalStorage('move');

  const [selectedMove, setSelectedMove] = useState<Move>(Move.Null);

  const [isMoveCommitted, setIsMoveCommitted] = useState<boolean>(false);

  const {
    error,
    isLoading: isNewGameSessionLoading,
    write: createNewGameSession,
    data: createNewGameSessionData,
  } = useContractWrite({
    ...contracts.factory,
    functionName: 'createGameSession',
    value: parseEther(bid),
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _salt = useRef<string | undefined>();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _move1Hash = useRef<Hash | undefined>();

  const { signMessage, data: signData } = useSignMessage();

  useEffect(() => {
    if (createNewGameSessionData?.hash && !error) {
      setIsMoveCommitted(true);
    }
  }, [createNewGameSessionData?.hash]);

  const [gameSessionHash, setGameSessionHash] = useState<Hash>();

  useEffect(() => {
    if (!createNewGameSessionData && signData && _move1Hash.current && player2)
      createNewGameSession({
        args: [_move1Hash.current, player2],
      });
  }, [signData]);

  useEffect(() => {
    if (gameSessionHash && _salt.current) {
      setSalt(_salt.current, `salt-${gameSessionHash}`);
      setMove1(String(selectedMove), `move-${gameSessionHash}`);
    }
  }, [gameSessionHash]);

  const { setErrorMessage, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    if (error?.message) setErrorMessage?.(error.message);
  }, [error?.message]);

  useEffect(() => {
    setIsLoading?.(isNewGameSessionLoading);
  }, [isNewGameSessionLoading]);

  return !isMoveCommitted ? (
    <S.Container>
      <S.MovesContainer>
        {moves.map((move: Move) => (
          <S.MoveItem
            className={selectedMove === move ? 'selected' : ''}
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
              isAddress(value) && setPlayer2(value)
            }
          />
          <S.PasteWalletAddressButton
            label="Paste"
            onClick={() => {
              navigator.clipboard
                .readText()
                .then((value) => isAddress(value) && setPlayer2(value));
            }}
          />
        </S.Input>
        <S.Input>
          <S.TextField
            inputProps={{
              step: '0.01',
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
          !(
            address &&
            selectedMove !== Move.Null &&
            Number(bid) > 0 &&
            validateAddress(player2)
          )
        }
        onClick={() => {
          const salt = crypto.randomUUID();

          _move1Hash.current = keccak256(
            encodePacked(['uint8', 'string'], [selectedMove, salt]),
          );

          _salt.current = salt;

          signMessage({
            message: `Your game move is: ${selectedMove}. Your game salt is: ${_salt.current}. Keep it private! It'll automatically be stored in your local storage.`,
          });
        }}
      >
        Submit session ✅
      </S.SubmitButton>
    </S.Container>
  ) : createNewGameSessionData?.hash ? (
    <TransactionHistory
      setGameSessionHash={setGameSessionHash}
      transactionHash={createNewGameSessionData?.hash}
    />
  ) : (
    <></>
  );
}

export default NewGamePage;
