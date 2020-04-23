export const CA = "0xCcac0dC382b326955CDB692A97D3AE67633064E9";

export const ABI = [
  {
    constant: true,
    inputs: [{ name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x01ffc9a7",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x06fdde03",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x081812fc",
  },
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x095ea7b3",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x18160ddd",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "totalPrice",
    outputs: [{ name: "", type: "int256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x221f2285",
  },
  {
    constant: false,
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x23b872dd",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "uint256" },
    ],
    name: "myMakersList",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x2a6d2a90",
  },
  {
    constant: true,
    inputs: [
      { name: "owner", type: "address" },
      { name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x2f745c59",
  },
  {
    constant: false,
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x42842e0e",
  },
  {
    constant: true,
    inputs: [{ name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x4f6ccce7",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x6352211e",
  },
  {
    constant: true,
    inputs: [],
    name: "baseURI",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x6c0360eb",
  },
  {
    constant: true,
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x70a08231",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x95d89b41",
  },
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xa22cb465",
  },
  {
    constant: false,
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
      { name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xb88d4fde",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "uint256" },
    ],
    name: "makersListUserInvest",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xbdde4ca7",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xc87b56dd",
  },
  {
    constant: true,
    inputs: [
      { name: "owner", type: "address" },
      { name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xe985e9c5",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
    ],
    name: "buyerList",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xf6c2ac03",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "makersList",
    outputs: [
      { name: "tokenId", type: "uint256" },
      { name: "postId", type: "string" },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "price", type: "int256" },
      { name: "targetCount", type: "int256" },
      { name: "dDay", type: "string" },
      { name: "timestamp", type: "uint256" },
      { name: "count", type: "uint256" },
      { name: "status", type: "int256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xf7e2e8df",
  },
  {
    inputs: [
      { name: "title", type: "string" },
      { name: "symbol", type: "string" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "tokenId", type: "uint256" },
      { indexed: false, name: "postId", type: "string" },
      { indexed: false, name: "title", type: "string" },
      { indexed: false, name: "description", type: "string" },
      { indexed: false, name: "price", type: "int256" },
      { indexed: false, name: "targetCount", type: "int256" },
      { indexed: false, name: "dDay", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
      { indexed: false, name: "buyers", type: "address[]" },
    ],
    name: "MakersCreated",
    type: "event",
    signature:
      "0x945137a8b660cf9431717f6c04d2672dbb0a74bd24fefea45c96301909bb9a7a",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: true, name: "tokenId", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
    signature:
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "approved", type: "address" },
      { indexed: true, name: "tokenId", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
    signature:
      "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "operator", type: "address" },
      { indexed: false, name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
    signature:
      "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31",
  },
  {
    constant: false,
    inputs: [
      { name: "postId", type: "string" },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "price", type: "int256" },
      { name: "targetCount", type: "int256" },
      { name: "dDay", type: "string" },
    ],
    name: "createMakers",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x34186c11",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getMakers",
    outputs: [
      { name: "", type: "uint256" },
      { name: "", type: "string" },
      { name: "", type: "string" },
      { name: "", type: "uint256" },
      { name: "", type: "address[]" },
      { name: "", type: "uint256" },
      { name: "", type: "int256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xffb0360a",
  },
  {
    constant: true,
    inputs: [],
    name: "getTotalMakersCount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xc767c4d3",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getTargetCount",
    outputs: [{ name: "", type: "int256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xdd50e51c",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "curruntTotalPrice",
    outputs: [{ name: "", type: "int256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xa6c918f6",
  },
  {
    constant: false,
    inputs: [{ name: "addressID", type: "address" }],
    name: "returnklay",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0x4e78eb28",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "prohibitOverlap",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x4010a406",
  },
  {
    constant: false,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "investMakers",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0x75082add",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getBuyers",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x7feafd20",
  },
  {
    constant: false,
    inputs: [
      { name: "walletAddress", type: "address" },
      { name: "price", type: "uint256" },
    ],
    name: "purchaseToken",
    outputs: [{ name: "", type: "bool" }],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0x1cc2c911",
  },
  {
    constant: true,
    inputs: [{ name: "Id", type: "address" }],
    name: "getMakersListUserInvest",
    outputs: [{ name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x1a0a912f",
  },
  {
    constant: true,
    inputs: [{ name: "Id", type: "address" }],
    name: "getMyMakers",
    outputs: [{ name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x8b72f2da",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getMakersPrice",
    outputs: [{ name: "", type: "int256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x9ad08511",
  },
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getMakersStatus",
    outputs: [{ name: "", type: "int256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x2502f465",
  },
  {
    constant: false,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "forcedClosure",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0x3d5cd679",
  },
];
