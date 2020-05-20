import apiClient from './apiClient';

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
  orderDate,
}) =>
  apiClient.post('/api/tx', {
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
    orderDate,
  });

export const listTx = ({ username }) => {
  return apiClient.get(`/api/tx?username=${username}`);
};
