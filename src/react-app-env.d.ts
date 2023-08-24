/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_PUBLIC_RPSLS_FACTORY_ADDRESS: `0x${string}`;
    REACT_APP_PUBLIC_ALCHEMY_API_KEY: string;
  }
}
