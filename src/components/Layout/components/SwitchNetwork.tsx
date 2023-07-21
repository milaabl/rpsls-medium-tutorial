import React from "react";
import { useSwitchNetwork, useNetwork, Chain } from "wagmi";
import * as S from './SwitchNetwork.styles';

function SwitchNetwork () {
    const { switchNetwork, chains } = useSwitchNetwork();
    const { chain } = useNetwork();
    return <S.Container>
        {chains && switchNetwork && !chains.find((supportedChain : Chain) => supportedChain.id === chain?.id) ? <>
        <S.WarningLabel>⚠️ The chain you're connected to is not supported. Consider switching to a supported chain to proceed.</S.WarningLabel>
        <S.SwitchButton onClick={
            () => switchNetwork(chains[0]?.id)
        }>Switch to {chains[0]?.name}</S.SwitchButton></> : <></>}
    </S.Container>
}

export default SwitchNetwork;