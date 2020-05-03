pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;


contract MakersContract {
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
  }

  // 판매자만 접근 가능한 함수
  modifier onlySeller(uint256 makersId) {
    require(msg.sender == makersList[makersId].seller);
    _;
  }

  // 구매자만 접근 가능한 함수
  modifier onlyBuyer(uint256 makersId) {
    require(msg.sender != makersList[makersId].seller);
    _;
  }

  event MakersCreated(
    uint256 makersId,
    uint256 price,
    uint256 targetCount,
    uint256 timestamp,
    uint256 dDay,
    address seller,
    string postId,
    string title
  );

  enum State {InProgress, FundingSuccess, FundingFailure}

  // 전체 makers list
  Makers[] internal makersList;

  // 판매자가 등록한 makers list
  mapping(address => Makers[]) public sellerMakers;

  // 구매자가 구매한 makers list
  mapping(address => Makers[]) public buyerMakers;

  // makers를 구매한 사용자 리스트  (Makers TokenId => 사용자 주소)
  mapping(uint256 => address[]) public makersBuyers;

  // makersId or postId로 makers 불러오기
  mapping(uint256 => Makers) public makersByMakersId;
  mapping(string => Makers) public makersByPostId;

  // maker의 state 설정
  mapping(uint256 => State) public makersState;

  // makers 등록 - parameter 최대 6개까지만 가능
  function createMakers(
    string memory postId,
    string memory title,
    uint256 price,
    uint256 targetCount,
    uint256 dDay
  ) public {
    uint256 makersId = makersList.length + 1;

    Makers memory newMakers = Makers(
      makersId,
      price,
      targetCount,
      now,
      dDay,
      0,
      msg.sender,
      postId,
      title
    );

    makersList.push(newMakers);
    sellerMakers[msg.sender].push(newMakers);
    makersState[makersId] = State.InProgress;
    makersByMakersId[makersId] = newMakers;
    makersByPostId[postId] = newMakers;

    emit MakersCreated(
      makersId,
      price,
      targetCount,
      now,
      dDay,
      msg.sender,
      postId,
      title
    );
  }

  function getTotalMakers() public view returns (Makers[] memory) {
    return makersList;
  }

  function getSellerMakers() public view returns (Makers[] memory) {
    return sellerMakers[msg.sender];
  }

  function getBuyerMakers() public view returns (Makers[] memory) {
    return buyerMakers[msg.sender];
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

  function getMakersState(uint256 makersId) public view returns (State) {
    return makersState[makersId];
  }
}
