import React, { Dispatch, createContext, useState } from 'react';

interface AppContextState {
  isLoading: boolean;
  setIsLoading?: Dispatch<boolean>;
  errorMessage?: string | undefined;
  setErrorMessage?: Dispatch<string | undefined>;
}

export const AppContext = createContext<AppContextState>({
  isLoading: false,
});

function AppContextProvider({ children }: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
