import { CircularProgress, styled } from "@mui/material";

export const Container = styled("div")`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(0, 4)};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  ${({ theme }) =>
    `${theme.breakpoints.up("md")} {
        width: 75%;
        margin-right: auto;
        margin-left: auto;
        padding: 0;
  }
    `}
`;

export const LoadingIconComponent = styled(CircularProgress)``;

export const Details = styled("div")`
  border-radius: ${({ theme }) => theme.spacing(2)}
    ${({ theme }) => theme.spacing(2)} 0 0;
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  padding: ${({ theme }) => theme.spacing(4)};
  position: relative;
  flex-direction: column;
  ${({ theme }) =>
    `${theme.breakpoints.up("md")} {
        padding: ${theme.spacing(10)};
  }
    `}
`;

export const DetailsItem = styled("div")`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  &:not(&:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.action.hover};
    margin-bottom: ${({ theme }) => theme.spacing(2.5)};
    padding-bottom: ${({ theme }) => theme.spacing(2.5)};
  }
`;

export const Heading = styled("h2")`
  ${({ theme }) => theme.typography.subtitle2};
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing(4)} 0;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: calc(100% + ${({ theme }) => theme.spacing(8)});
    border-bottom: 2px dashed ${({ theme }) => theme.palette.action.selected};
    height: 2px;
    right: 0;
    left: -${({ theme }) => theme.spacing(4)};
    ${({ theme }) =>
      `${theme.breakpoints.up("md")} {
            left: -${theme.spacing(10)};
            width: calc(100% + ${theme.spacing(20)});
    }`}
  }
  ${({ theme }) =>
    `${theme.breakpoints.up("md")} {
        ${theme.typography.h2};
        padding: 0;
        padding-bottom: ${theme.spacing(5)};
        margin-bottom: ${theme.spacing(5)};
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
    50% / ${({ theme }) => theme.spacing(5)} 100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
  background-color: ${({ theme }) => theme.palette.common.white};
  height: ${({ theme }) => theme.spacing(10)};
  border-top: 2px solid ${({ theme }) => theme.palette.action.selected};
  ${({ theme }) =>
    `${theme.breakpoints.up("md")} {
        height: ${theme.spacing(15)};
        --mask: conic-gradient(from -45deg at bottom,#0000,#000 1deg 90deg,#0000 91deg) 50% / ${theme.spacing(
          15,
        )} 100%;
    }
    `}
`;

export const SuccessIndicator = styled("img")`
  border-radius: 100%;
  display: block;
  margin: auto;
  padding: ${({ theme }) => theme.spacing(2.5)};
  box-sizing: content-box;
  position: absolute;
  top: 0px;
  transform: translateY(-50%);
  background-color: #90ee90;
  left: 0;
  right: 0;
`;
