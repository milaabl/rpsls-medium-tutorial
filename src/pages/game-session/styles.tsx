import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Typography, styled } from "@mui/material";

export const Container = styled("div")`
  margin: ${({ theme }) => theme.spacing(2)};
`;

export const GameSolvedContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  width: fit-content;
  margin: ${({ theme }) => theme.spacing(4)} auto;
`;

export const GameSolvedTitle = styled(Typography)`
  display: inline-block;
  position: relative;
  &:before {
    content: " ";
    display: block;
    height: 90%;
    width: 100%;
    margin-left: -3px;
    margin-right: -3px;
    position: absolute;
    background: ${({ theme }) => theme.palette.yellow?.main};
    transform: rotate(2deg);
    top: -1px;
    left: -1px;
    border-radius: 20% 25% 20% 24%;
    padding: 10px 3px 3px 10px;
  }
`;

export const HighlightContainer = styled("span")`
  position: relative;
`;

export const PlayerContainer = styled("ul")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const SolveButton = styled(LoadingButton)`
  display: flex;
  margin: auto;
  margin-top: ${({ theme }) => theme.spacing(4)};
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.common.white};
  border: 1px solid ${({ theme }) => theme.palette.green?.main};
  box-shadow: ${({ theme }) =>
    `0px 0px ${theme.spacing(2)} ${theme.palette.green?.lightest}`};
  border-radius: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
  text-transform: capitalize;
  color: ${({ theme }) => theme.palette.common.black};
  padding: ${({ theme }) => theme.spacing(2, 4)};
  font-weight: 600;
  &:hover {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const MovesContainer = styled("ul")`
  margin: 0 auto ${({ theme }) => theme.spacing(5)};
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: center;
  width: 70%;
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

export const SubmitMoveButton = styled(LoadingButton)`
  display: flex;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.common.white};
  border: 1px solid ${({ theme }) => theme.palette.blue?.main};
  width: fit-content;
  box-shadow: ${({ theme }) =>
    `0px 0px ${theme.spacing(2)} ${theme.palette.blue?.lightest}`};
  border-radius: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
  padding: ${({ theme }) => theme.spacing(2, 4)};
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ theme }) => theme.palette.common.black};
  &:hover {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const SuccessBox = styled("div")`
  margin-top: ${({ theme }) => theme.spacing(2)};
  border: 1px solid ${({ theme }) => theme.palette.green?.light};
  background-color: ${({ theme }) => theme.palette.green?.lightest};
  padding: ${({ theme }) => theme.spacing(2, 4)};
  font-weight: 600;
  ${({ theme }) => theme.typography.subtitle1}
  border-radius: ${({ theme }) => theme.spacing(1)};
`;

export const TimeoutButton = styled(LoadingButton)`
  display: flex;
  margin: auto;
  margin-top: ${({ theme }) => theme.spacing(4)};
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.common.white};
  border: 1px solid ${({ theme }) => theme.palette.orange?.main};
  box-shadow: ${({ theme }) =>
    `0px 0px ${theme.spacing(2)} ${theme.palette.orange?.main}`};
  border-radius: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
  text-transform: capitalize;
  color: ${({ theme }) => theme.palette.common.black};
  padding: ${({ theme }) => theme.spacing(2, 4)};
  font-weight: 600;
  &:hover {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const DetailsItem = styled("li")`
  display: flex;
  flex-direction: column;
  & strong {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

export const HiddenMoveImage = styled("img")`
  filter: blur(10px);
  border-radius: 100%;
  width: 50%;
`;

export const MoveImage = styled("img")`
  border-radius: 100%;
  width: 50%;
`;
