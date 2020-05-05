async function getCount(address) {
  const cnt = await cav.klay.getTransactionCount(address);
  return cnt;
}

export const _investMakers = makersId => {
  console.log("invest", makersId);

  MakersContract.methods
    .showMakersState(makersId)
    .call()
    .then(result => {
      if (result === "0" || result === "2") {
        console.log("신청 종료된 상품입니다.");
        toast.error("신청 종료된 상품입니다.");
        return 0;
      } else {
        MakersContract.methods
          .prohibitOverlap(makersId)
          .call()
          .then(result2 => {
            if (result2 === false) {
              console.log("이미 신청한 상품입니다.");
              toast.error("이미 신청한 상품입니다.");
              return 0;
            } else {
              MakersContract.methods
                .showMakersPrice(makersId)
                .call()
                .then(price => {
                  if (!price) {
                    return 0;
                  }

                  getCount(getWallet().address).then(cnt => {
                    MakersContract.methods
                      .investMakers(makersId)
                      .send({
                        from: getWallet().address,
                        gas: "200000000",
                        value: cav.utils.toPeb(price.toString(), "KLAY"),
                        nonce: cnt + 1,
                      })
                      .once("transactionHash", txHash => {
                        console.log("txHash:", txHash);

                        // TODO : param1 : txHash
                        // TODO : 여기!
                        dealService.registerDeal(txHash);

                        toast.info("처리중입니다.");
                      })
                      .once("receipt", receipt => {
                        receipt.status
                          ? toast.success("신청 성공하였습니다") &&
                            toast.success(
                              `TX Hash: '${receipt.transactionHash}'`,
                            )
                          : toast.error("신청 실패하였습니다");
                      })
                      .once("error", error => {
                        console.log("_Invest Error");
                        console.log(error);
                        toast.error(`실패하였습니다 ${error.toString()}`);
                      });
                  });
                });

              console.log("------------------------------------");
              console.log("reward Eco power");
              console.log("------------------------------------");

              EcoTokenContract.methods
                .transfer(getWallet().address, 3)
                .send({
                  from: getWallet().address,
                  gas: "200000000",
                })
                .once("receipt", receipt => {
                  console.log("Eco power 영수증");
                  toast.success(`에코파워가 지급되었습니다.`);
                  toast.success(`${receipt.transactionHash}`);
                })
                .once("error", error => {
                  console.log(error);
                  toast.success(`에코파워 지급에 실패하였습니다.`);
                });
            }
          });
      }
    });
};
