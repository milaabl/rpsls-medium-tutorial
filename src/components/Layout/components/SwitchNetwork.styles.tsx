import { styled } from "@mui/material";

export const Container = styled("div")`
    width: 100%;
    padding: ${({theme}) => theme.spacing(2, 6)};
    border: 1px solid ${({theme}) => theme.palette.lavender?.main};
    padding: ${({theme}) => theme.spacing(2, 4)};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const WarningLabel = styled("span")`
    font-weight: 600;
`;

export const SwitchButton = styled("button")`
    font-size: ${({theme}) => theme.typography.subtitle1};
    border-radius: ${({theme}) => theme.spacing(1)};
    border: 1px solid ${({theme}) => theme.palette.lavender?.main};
`;