import { styled } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  margin: ${({ theme }) => theme.spacing(4)};
`;

export const LinkToSession = styled("button")`
  width: 100%;
  display: flex;
  padding: ${({ theme }) => theme.spacing(2, 4)};
  ${({ theme }) => theme.typography.subtitle1}
  border: 1px solid ${({ theme }) => theme.palette.lavender?.main};
  background-color: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;
  justify-content: space-between;
`;

export const ArrowRightButton = styled(ArrowForwardIcon)`
  cursor: pointer;
`;

export const NoAvailableGameSessions = styled("div")`
  margin: auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(5)} auto;
`;

export const NoAvailableGameSessionsLabel = styled("h1")`
  ${({ theme }) => theme.typography.h5}
  text-align: center;
  margin: auto;
`;

export const NewGameSessionLink = styled("button")`
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.spacing(1)};
`;
