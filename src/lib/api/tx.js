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
  typeName,
  klay,
  TxFee,
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
    typeName,
    klay,
    TxFee,
  });

export const listTx = ({ username }) => {
  return apiClient.get(`/api/tx?username=${username}`);
};
