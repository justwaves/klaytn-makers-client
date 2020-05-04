pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;


contract MakersContract {
  enum State {InProgress, FundingSuccess, FundingFailure}

  struct Makers {
    uint256 makersId;
    uint256 price;
    uint256 targetCount;
    uint256 timestamp;
    uint256 dDay;
    uint256 count;
    address seller;
    string postId;
    string title;
    State state;
  }

  event MakersCreated(
    uint256 makersId,
    uint256 price,
    uint256 targetCount,
    uint256 timestamp,
    uint256 dDay,
    uint256 count,
    address seller,
    string postId,
    string title,
    State state,
    Makers[] sellerMakersList
  );

  // 전체 makers list
  Makers[] internal makersList;

  // 판매자가 등록한 makers list
  Makers[] internal sellerMakersList;
  mapping(address => Makers[]) public sellerMakers;

  // 구매자가 구매한 makers list
  Makers[] internal buyerMakersList;
  mapping(address => Makers[]) public buyerMakers;

  // makers를 구매한 사용자 리스트  (Makers makersId => 사용자 주소)
  mapping(uint256 => address[]) public makersBuyers;

  // makersId or postId로 makers 불러오기
  mapping(uint256 => Makers) public makersByMakersId;
  mapping(string => Makers) public makersByPostId;

  // makers 등록 - parameter 최대 6개까지만 가능
  function createMakers(
    string memory postId,
    string memory title,
    uint256 price,
    uint256 targetCount,
    uint256 dDay
  ) public {
    uint256 makersId = makersList.length + 1;

    Makers memory newMakers = Makers({
      makersId: makersId,
      price: price,
      targetCount: targetCount,
      timestamp: now,
      dDay: dDay,
      count: 0,
      seller: msg.sender,
      postId: postId,
      title: title,
      state: State.InProgress
    });

    makersList.push(newMakers);
    sellerMakersList.push(newMakers);
    sellerMakers[msg.sender] = sellerMakersList;
    makersByMakersId[makersId] = newMakers;
    makersByPostId[postId] = newMakers;

    emit MakersCreated(
      makersId,
      price,
      targetCount,
      0,
      now,
      dDay,
      msg.sender,
      postId,
      title,
      State.InProgress,
      sellerMakersList
    );
  }

  function getTotalMakers() public view returns (Makers[] memory) {
    return makersList;
  }

  function getSellerMakers(address seller)
    public
    view
    returns (Makers[] memory)
  {
    return sellerMakers[seller];
  }

  function getBuyerMakers(address buyer) public view returns (Makers[] memory) {
    return buyerMakers[buyer];
  }

  function getMakersByMakersId(uint256 makersId)
    public
    view
    returns (Makers memory)
  {
    return makersByMakersId[makersId];
  }

  function getMakersByPostId(string memory postId)
    public
    view
    returns (Makers memory)
  {
    return makersByPostId[postId];
  }

  function getMakersBuyers(uint256 makersId)
    public
    view
    returns (address[] memory)
  {
    return makersBuyers[makersId];
  }
}
