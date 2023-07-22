import { isAddress } from "viem";

export const validateAddress = (address : string | undefined) => address && isAddress(address);