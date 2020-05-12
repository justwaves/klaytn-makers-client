import caver from './caver';
import { ABI, CA } from './deployedContract';

const ContractAPI = new caver.klay.Contract(ABI, CA);

export default ContractAPI;
