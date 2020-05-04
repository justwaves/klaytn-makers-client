import qs from "qs";
import apiClient from "./apiClient";

export const writeTx = ({
  type,
  blockNumber,
  blockHash,
  from,
  to,
  gas,
  gasPrice,
  gasUsed,
  transactionHash,
}) =>
  apiClient.post("/api/tx", {
    type,
    blockNumber,
    blockHash,
    from,
    to,
    gas,
    gasPrice,
    gasUsed,
    transactionHash,
  });

export const listTx = ({ username }) => {
  const queryString = qs.stringify({
    username,
  });

  return apiClient.get(`/api/tx?${queryString}`);
};
