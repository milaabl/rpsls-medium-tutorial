import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import { AppContext } from 'context/AppContext';

import * as S from './Layout.styles';
import Header from './components/Header';

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
