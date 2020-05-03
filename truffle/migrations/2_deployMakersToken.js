const CONTRACT = artifacts.require("./contracts/MakersContract.sol");
const fs = require("fs");

module.exports = function (deployer) {
  deployer.deploy(CONTRACT).then(() => {
    if (CONTRACT._json) {
      fs.writeFile("deployed/ABI", JSON.stringify(CONTRACT._json.abi), err => {
        if (err) throw err;
        console.log("ABI 입력 성공");
      });
    }

    fs.writeFile("deployed/CA", CONTRACT.address, err => {
      if (err) throw err;
      console.log("CA 입력 성공");
    });
  });
};
