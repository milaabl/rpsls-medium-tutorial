import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Loader from "components/Loader/Loader";
import { AppContext } from "context/AppContext";
import * as S from "./Layout.styles";

function Layout() {
  const { isLoading, errorMessage } = useContext(AppContext);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {errorMessage ? <S.ErrorLabel>🪲 {errorMessage}</S.ErrorLabel> : <></>}
      <Loader isLoading={isLoading} />
    </>
  );
}

export default Layout;
