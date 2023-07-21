import { styled } from "@mui/material";

export const ErrorLabel = styled("div")`
  ${({ theme }) => theme.typography.subtitle1};
  z-index: 100;
  font-weight: bold;
  border: 2px inset ${({ theme }) => theme.palette.error.main};
  width: 100%;
  position: fixed;
  display: flex;
  bottom: 1px;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  align-items: center;
  justify-content: center;
`;
