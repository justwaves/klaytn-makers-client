pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "./MakersContract.sol";


contract MakersOrder is MakersContract {
  event MakersOrdered(
    uint256 count,
    uint256 makersId,
    string title,
    Makers[] buyerMakersList,
    address buyer,
    Makers makersList,
    uint256 makersListCount
  );

  event FundingEnded(uint256 makersId, State state);

  // 판매자만 접근 가능한 함수
  modifier onlySeller(uint256 makersId) {
    require(msg.sender == makersByMakersId[makersId].seller);
    _;
  }

  // 구매자만 접근 가능한 함수
  modifier onlyBuyer(uint256 makersId) {
    require(msg.sender != makersByMakersId[makersId].seller);
    _;
  }

  // makersId => makers에 투자된 총액
  mapping(uint256 => uint256) totalKlayAmount;

  // 주문하기
  function orderMakers(uint256 makersId) public payable {
    Makers storage currentMakers = makersByMakersId[makersId];
    // require(currentMakers.state == State.InProgress);
    // require(msg.value == currentMakers.price);
    string memory postId = currentMakers.postId;

    address payable payableSeller = address(uint160(currentMakers.seller));
    payableSeller.transfer(msg.value);
    uint256 index = uint256(makersId) - 1;

    currentMakers.count++;
    buyerMakersList.push(currentMakers);
    buyerMakers[msg.sender] = buyerMakersList;
    totalKlayAmount[makersId] += msg.value;
    makersBuyers[makersId].push(msg.sender);
    makersByMakersId[makersId] = currentMakers;
    makersByPostId[postId] = currentMakers;
    makersList[index].count++;

    emit MakersOrdered(
      currentMakers.count,
      makersId,
      currentMakers.title,
      buyerMakersList,
      msg.sender,
      makersList[index],
      makersList[index].count
    );
  }

  function changeState(uint256 makersId) public {
    Makers memory currentMakers = makersByMakersId[makersId];

    require(currentMakers.dDay < now);

    if (currentMakers.count >= currentMakers.targetCount) {
      currentMakers.state = State.FundingSuccess;
    } else if (currentMakers.count < currentMakers.targetCount) {
      currentMakers.state = State.FundingFailure;
    }

    emit FundingEnded(makersId, currentMakers.state);
  }

  function succeedFunding(uint256 makersId)
    public
    payable
    onlySeller(makersId)
  {
    Makers memory currentMakers = makersByMakersId[makersId];
    require(currentMakers.state == State.FundingSuccess);

    uint256 profits = totalKlayAmount[makersId];

    address payable payableSeller = address(uint160(currentMakers.seller));
    payableSeller.transfer(profits);
    totalKlayAmount[makersId] = 0;
  }

  function failFunding(uint256 makersId) public payable onlySeller(makersId) {
    Makers memory currentMakers = makersByMakersId[makersId];
    require(currentMakers.state == State.FundingFailure);

    address[] memory refundList = makersBuyers[makersId];

    for (uint256 i = 0; i < refundList.length; i++) {
      address payable buyer = address(uint160(refundList[i]));
      buyer.transfer(currentMakers.price);
    }
  }

  // Makers 강제 마감
  function forcedClosure(uint256 makersId) public view {
    require(msg.sender == makersByMakersId[makersId].seller);
    Makers memory currentMakers = makersByMakersId[makersId];
    currentMakers.state = State.FundingFailure;
  }
}
