import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material';

export const Header = styled('header')`
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => theme.spacing(2, 4)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.green?.lightest};
`;

export const Logo = styled('img')`
  width: ${({ theme }) => theme.spacing(10)};
`;

export const Button = styled(LoadingButton)`
  text-transform: inherit;
  border: 2px solid ${({ theme }) => theme.palette.orange?.main};
  color: ${({ theme }) => theme.palette.common.black};
  font-weight: bold;
  background-color: ${({ theme }) => theme.palette.common.white};
  &:hover {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const AccountAddress = styled('div')`
  border: 1px solid ${({ theme }) => theme.palette.action.selected};
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.common.white};
`;
