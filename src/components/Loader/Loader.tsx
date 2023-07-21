import React from "react";
import { styled } from "@mui/material";
import MuiCircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

const Container = styled("div")`
  position: fixed;
  inset: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  filter: blur(0.1);
  touch-action: none;
  background-color: rgba(256, 256, 256, 0.5);
`;
const CircularProgress = styled(MuiCircularProgress)`
  color: ${({ theme }) => theme.palette.orange?.main};
`;

interface LoaderProps {
  isLoading: boolean;
}

function Loader({ isLoading }: LoaderProps) {
  return isLoading ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    <></>
  );
}

export default Loader;
