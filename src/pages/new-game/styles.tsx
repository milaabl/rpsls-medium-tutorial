import {
  Button,
  Card,
  Chip,
  Divider as MuiDivider,
  TextField as MuiTextField,
  styled,
} from "@mui/material";

export const Container = styled("div")`
  padding: ${({ theme }) => theme.spacing(10, 20)};
`;

export const MovesContainer = styled("ul")`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: center;
  width: 70%;
  margin: auto;
  flex-wrap: wrap;
`;

export const MoveItem = styled("li")`
  cursor: pointer;
  display: flex;
  width: 30%;
  &.selected {
    ${({ theme }) => `
            border: 5px solid ${theme.palette.error.main};
            padding: 7px;
        `}
  }
  & img {
    width: 100%;
    border-radius: 100%;
  }
`;

export const Divider = styled(MuiDivider)``;

export const TransactionContainer = styled(Card)``;

export const TextField = styled(MuiTextField)`
  width: 100%;

  & label.Mui-focused {
    color: ${({ theme }) => theme.palette.common.black};
  }

  & .MuiOutlinedInput-root {
    background-color: ${({ theme }) => theme.palette.common.white};
    & fieldset {
      border-color: ${({ theme }) => theme.palette.common.black};
    }
    &:hover fieldset {
      border-color: ${({ theme }) => theme.palette.common.black};
    }
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.palette.orange?.main};
    }
  }
`;

export const Form = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const PasteWalletAddressButton = styled(Chip)`
  position: absolute;
  width: fit-content;
  top: 0;
  bottom: 0;
  right: 0;
  margin-right: ${({ theme }) => theme.spacing(1)};
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  transform: translateY(-12px);
  &,
  &:hover {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
  border: 2px solid ${({ theme }) => theme.palette.action?.selected};
`;

export const SubmitButton = styled(Button)`
  border: 2px solid ${({ theme }) => theme.palette.orange?.main};
  color: ${({ theme }) => theme.palette.common.black};
  border-radius: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  text-transform: inherit;
  width: 100%;
  ${({ theme }) => theme.typography.h6}
  &:hover {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const Heading = styled("h2")`
  ${({ theme }) => theme.typography.h4};
`;

export const Input = styled("div")`
  position: relative;
`;
