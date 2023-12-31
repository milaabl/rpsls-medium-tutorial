import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import logoIcon from 'assets/icons/logo.svg';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import * as S from './Header.styles';
import SwitchNetwork from './SwitchNetwork';

function Header() {
  const { isLoading: isConnectingWallet, connectors, connect } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <>
      <S.Header>
        <S.Logo alt="Logo" src={logoIcon} />
        {!address ? (
          <S.Button
            loading={isConnectingWallet}
            onClick={() =>
              connect({
                connector: connectors[0],
              })
            }
            startIcon={<AccountCircleIcon />}
          >
            Connect wallet
          </S.Button>
        ) : (
          <S.AccountAddress>
            <IconButton size="small" onClick={() => disconnect()}>
              <CancelIcon color="error" fontSize="inherit" />
            </IconButton>
            <span>{address}</span>
          </S.AccountAddress>
        )}
      </S.Header>
      <SwitchNetwork />
    </>
  );
}

export default Header;
