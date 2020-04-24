pragma solidity ^0.5.6;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";


contract MakersToken is ERC721Full {
  event MakersCreated(
    uint256 indexed tokenId,
    string postId,
    string title,
    string description,
    int256 price,
    int256 targetCount,
    string dDay,
    uint256 timestamp,
    address[] buyers
  );

  constructor(string memory title, string memory symbol)
    public
    ERC721Full(title, symbol)
  {}

  // 전체 makers 배열
  mapping(uint256 => Makers) public makersList;

  // 총 모금액
  mapping(uint256 => int256) public totalPrice;

  // 내가 등록한 상품 리스트
  mapping(address => uint256[]) public myMakersList;

  // 참여한 MakerList
  mapping(address => uint256[]) public makersListUserInvest;

  // 중복 참여 방지를 위한 mapping
  mapping(uint256 => address[]) public buyerList;

  struct Makers {
    uint256 tokenId;
    string postId;
    string title;
    string description;
    int256 price;
    int256 targetCount;
    string dDay;
    uint256 timestamp;
    address[] buyers; // 상품의 구매자 배열
    uint256 count; // 구매자 수
    int256 status; // 상품 상태 => 0: 진행 / 1: 목표금액 달성 / 2: 시간 종료
  }

  // Makers 업로드 - parameter 최대 6개까지 가능함
  function createMakers(
    string memory postId,
    string memory title,
    string memory description,
    int256 price,
    int256 targetCount,
    string memory dDay
  ) public {
    // totalSupply(): 발행된 전체 토큰의 개수를 알려주는 ERC20 함수
    uint256 tokenId = totalSupply() + 1;

    _mint(msg.sender, tokenId);

    address[] memory buyers;

    Makers memory newMakers = Makers({
      tokenId: tokenId,
      postId: postId,
      title: title,
      description: description,
      price: price,
      targetCount: targetCount,
      dDay: dDay,
      timestamp: now,
      buyers: buyers,
      count: 0,
      status: 0
    });

    makersList[tokenId] = newMakers;
    myMakersList[msg.sender].push(tokenId);

    emit MakersCreated(
      tokenId,
      postId,
      title,
      description,
      price,
      targetCount,
      dDay,
      now,
      buyers
    );
  }

  // token id로 한 개의 makers 불러오기
  function getMakers(uint256 tokenId)
    public
    view
    returns (
      uint256,
      string memory,
      string memory,
      uint256,
      address[] memory,
      uint256,
      int256
    )
  {
    return (
      makersList[tokenId].tokenId,
      makersList[tokenId].postId,
      makersList[tokenId].title,
      makersList[tokenId].timestamp,
      makersList[tokenId].buyers,
      makersList[tokenId].count,
      makersList[tokenId].status
    );
  }

  // 전체 토큰 count 불러오기
  function getTotalMakersCount() public view returns (uint256) {
    return totalSupply();
  }

  // TargetCount 불러오기
  function getTargetCount(uint256 tokenId) public view returns (int256) {
    // require(msg.sender == ownerOf(tokenId), "This function can access only owner of Token");
    return makersList[tokenId].targetCount;
  }

  // 해당 makers의 현재 모금액 확인
  function curruntTotalPrice(uint256 tokenId) public view returns (int256) {
    return totalPrice[tokenId];
  }

  // 시간 내 목표 금액 달성 실패 시 환불
  function returnklay(address addressID) public payable {
    address payable payableTokenSeller = address(uint160(addressID));
    payableTokenSeller.transfer(msg.value);
  }

  // 중복 방지
  function prohibitOverlap(uint256 tokenId) public view returns (bool) {
    uint256[] memory investmentList = makersListUserInvest[msg.sender];
    for (uint256 i = 0; i < investmentList.length; i++) {
      if (tokenId == investmentList[i]) {
        return false; // 이미 투자함
      }
    }
    return true;
  }

  // 상품 투자(구매)하기
  function investMakers(uint256 tokenId) public payable {
    int256 price = makersList[tokenId].price;
    require(
      msg.sender != ownerOf(tokenId),
      "본인이 등록한 상품은 구매할 수 없습니다."
    );
    // TODO: 판매 종료된 상품 구매 불가 처리

    makersList[tokenId].count += 1;
    buyerList[tokenId].push(msg.sender);
    address MakersOwner = ownerOf(tokenId);
    address payable payableTokenSeller = address(uint160(MakersOwner));
    payableTokenSeller.transfer(msg.value); // makers Token의 owner 계정으로 klay 송금
    totalPrice[tokenId] += price; // 전체 금액 증가
    makersList[tokenId].buyers.push(msg.sender); // 투자자 리스트에 push
    makersListUserInvest[msg.sender].push(tokenId); // 내가 투자한 상품 리스트에 push
  }

  // 투자자 리스트 불러오기
  function getBuyers(uint256 tokenId) public view returns (address[] memory) {
    return makersList[tokenId].buyers;
  }

  // Klay 송금  (상품 구매 로직)
  function purchaseToken(address walletAddress, uint256 price)
    public
    payable
    returns (bool)
  {
    require(msg.value >= price, "caller sent klay lower than price");
    address payable payableTokenSeller = address(uint160(walletAddress));
    payableTokenSeller.transfer(msg.value);
    return true;
  }

  // 내가 구매한 Makers List 불러오기 (구매자)
  function getMakersListUserInvest(address Id)
    public
    view
    returns (uint256[] memory)
  {
    return makersListUserInvest[Id];
  }

  // 내가 판매한 Makers List 불러오기 (판매자)
  function getMyMakers(address Id) public view returns (uint256[] memory) {
    return myMakersList[Id];
  }

  // Makers Price 불러오기
  function getMakersPrice(uint256 tokenId) public view returns (int256) {
    return makersList[tokenId].price;
  }

  // Makers status 불러오기
  function getMakersStatus(uint256 tokenId) public view returns (int256) {
    int256 result = makersList[tokenId].status;
    if (result == 0) {
      return 0;
    } else if (result == 1) {
      return 1;
    } else {
      return 2;
    }
  }

  // Makers 강제 마감
  function forcedClosure(uint256 tokenId) public payable {
    require(msg.sender == ownerOf(tokenId), "Error");
    makersList[tokenId].status = 2;
  }
}
