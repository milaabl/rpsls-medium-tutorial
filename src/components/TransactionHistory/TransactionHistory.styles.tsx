import { CircularProgress, styled } from "@mui/material";

export const Container = styled("div")`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(0, 2)};
  margin-bottom: ${({ theme }) => theme.spacing(2.5)};
  margin-top: ${({theme}) => theme.spacing(3)};
  ${({ theme }) =>
    `${theme.breakpoints.up("md")} {
        margin-top: ${theme.spacing(6)};
        width: 75%;
        margin-right: auto;
        margin-left: auto;
        padding: 0;
  }
    `}
`;

export const LoadingIconComponent = styled(CircularProgress)`
  display: block;
  margin: auto;
`;

export const Details = styled("div")`
  border-radius: ${({ theme }) => theme.spacing(1)}
    ${({ theme }) => theme.spacing(1)} 0 0;
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  padding: ${({ theme }) => theme.spacing(2)};
  position: relative;
  flex-direction: column;
  ${({ theme }) =>
    `${theme.breakpoints.up("md")} {
        padding: ${theme.spacing(2.5)};
  }
    `}
`;

export const DetailsItem = styled("div")`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  &:not(&:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.action.hover};
    margin-bottom: ${({ theme }) => theme.spacing(1.25)};
    padding-bottom: ${({ theme }) => theme.spacing(1.25)};
  }
`;

export const Heading = styled("h2")`
  ${({ theme }) => theme.typography.h5};
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing(2)} 0;
  margin-top: 0px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: calc(100% + ${({ theme }) => theme.spacing(4)});
    border-bottom: 2px dashed ${({ theme }) => theme.palette.action.selected};
    height: 2px;
    right: 0;
    left: -${({ theme }) => theme.spacing(2)};
    ${({ theme }) =>
      `${theme.breakpoints.up("md")} {
            left: -${theme.spacing(2.5)};
            width: calc(100% + ${theme.spacing(5)});
    }`}
  }
  ${({ theme }) =>
    `${theme.breakpoints.up("md")} {
        ${theme.typography.h2};
        padding: 0;
        padding-bottom: ${theme.spacing(2.5)};
        margin-bottom: ${theme.spacing(2.5)};
    }
    `}
`;

export const CutOffBorder = styled("div")`
  --mask: conic-gradient(
      from -45deg at bottom,
      #0000,
      #000 1deg 90deg,
      #0000 91deg
    )
    50% / ${({ theme }) => theme.spacing(2.5)} 100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
  background-color: ${({ theme }) => theme.palette.common.white};
  height: ${({ theme }) => theme.spacing(5)};
  border-top: 2px solid ${({ theme }) => theme.palette.action.selected};
  ${({ theme }) =>
    `${theme.breakpoints.up("md")} {
        height: ${theme.spacing(7.5)};
        --mask: conic-gradient(from -45deg at bottom,#0000,#000 1deg 90deg,#0000 91deg) 50% / ${theme.spacing(
          7.5,
        )} 100%;
    }
    `}
`;

export const SuccessIndicator = styled("img")`
  border-radius: 100%;
  display: block;
  margin: auto;
  padding: ${({ theme }) => theme.spacing(1.25)};
  box-sizing: content-box;
  position: absolute;
  top: 0px;
  transform: translateY(-50%);
  background-color: #90ee90;
  left: 0;
  right: 0;
`;

export const GameButtonsContainer = styled("div")`
    margin: auto;
    display: flex;
    flex-direction: column;
    ${({theme}) => theme.breakpoints.up("md")} {
      flex-direction: row;
      justify-content: space-between;
      gap: ${({theme}) => theme.spacing(2)};
      max-width: 75%;
    }
`;

export const InviteOpponentButton = styled("button")`
    width: 100%;
    border-radius: ${({theme}) => theme.spacing(1)};
    background-color: ${({theme}) => theme.palette.common.white};
    max-width: 420px;
    padding: ${({theme}) => theme.spacing(1, 2)};
    cursor: pointer;
    font-size: ${({theme}) => theme.typography.button.fontSize};
    font-weight: 600;
`;

export const GoToSolveGameButton = styled("button")`
    border-radius: ${({theme}) => theme.spacing(1)};
    width: 100%;
    background-color: ${({theme}) => theme.palette.common.white};
    max-width: 420px;
    padding: ${({theme}) => theme.spacing(1, 2)};
    cursor: pointer;
    font-size: ${({theme}) => theme.typography.button.fontSize};
    font-weight: 600;
`;