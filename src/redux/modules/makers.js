/* eslint-disable camelcase */
import { createAction, handleActions } from "redux-actions";
import contractAPI from "klaytn/contractAPI";
import { getWallet } from "utils/crypto";
import ui from "utils/ui";
import { feedParser } from "utils/misc";
import Makers from "pages/Makers";
import { toast } from "react-toastify";

export const SET_FEED = "makers/SET_FEED";

// Action creators
const setFeed = createAction(SET_FEED, feed => feed);

// TODO: Makers 리스트
export const getFeed = () => async dispatch => {
  try {
    const totalMakersCount = await contractAPI.methods
      .getTotalMakersCount()
      .call();

    // 등록된 상품이 없을 경우 [] 리턴
    if (!totalMakersCount) {
      return [];
    }

    const feed = [];

    // eslint-disable-next-line no-plusplus
    for (let i = totalMakersCount; i > 0; i--) {
      // eslint-disable-next-line no-await-in-loop
      const product = await contractAPI.methods.getMakers(i).call();
      feed.push(product);
    }

    dispatch(setFeed(feedParser(feed)));
  } catch (e) {
    console.log(e);
  }
};

const updateFeed = tokenId => async (dispatch, getState) => {
  console.log("updateFeed");

  const newMakers = await contractAPI.methods.getMakers(tokenId).call();

  const {
    makers: { feed },
  } = getState();
  const newFeed = [feedParser(newMakers), ...feed];

  dispatch(setFeed(newFeed));
};

// --------------------------------------------------
//  MyMakers 확인
// --------------------------------------------------
// eslint-disable-next-line no-underscore-dangle
export const _showMyMakers = addressId => dispatch => {
  contractAPI.methods
    .showMyMakers(addressId)
    .call()
    .then(totalMyMakers => {
      if (!totalMyMakers.length) {
        console.log("없음");
        return [];
      }
      const feed = [];

      // eslint-disable-next-line no-plusplus
      for (let i = totalMyMakers.length - 1; i > 0; i--) {
        const product = contractAPI.methods.getMakers(totalMyMakers[i]).call();

        feed.push(product);
      }
      return Promise.all(feed);
    })
    .then(() => dispatch(setFeed(feedParser(Makers))));
};

// ----------------------------------------------------------------
//              Makers 삭제
// ----------------------------------------------------------------

export const removeMakers = tokenId => dispatch => {
  contractAPI.methods
    .removeMakers(tokenId)
    .send({
      from: getWallet().address,
      gas: "200000000",
    })
    .once("transactionHash", txHash => {
      console.log("txHash:", txHash);
      ui.showToast({
        status: "pending",
        message: "Sending a transaction... (uploadPhoto)",
        txHash,
      });
    })
    .once("receipt", receipt => {
      ui.showToast({
        status: receipt.status ? "success" : "fail",
        message: `Received receipt! It means your transaction is
        in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
        link: receipt.transactionHash,
      });
      // eslint-disable-next-line no-shadow
      const tokenId = receipt.events.MakersUploaded.returnValues[0];

      console.log("tokenId: ", tokenId);
      dispatch(updateFeed(tokenId));
    })
    .once("error", error => {
      ui.showToast({
        status: "error",
        message: error.toString(),
      });
    });
};

// ----------------------------------------------------------------
//              Makers 업로드
// ----------------------------------------------------------------

export const uploadItem = (
  filePath,
  title,
  description,
  targetKlay,
  D_day,
  price,
) => async dispatch => {
  console.log(
    `
    filepath   : ${filePath} 
    title      : ${title}
    description: ${description}
    targetKlay : ${targetKlay}
    D_day      : ${D_day}
    price      : ${price}
    `,
  );

  contractAPI.methods
    .uploadMakers(filePath, title, description, targetKlay, D_day, price)
    .send({
      from: getWallet().address,
      gas: "2000000",
    })
    .once("transactionHash", txHash => {
      console.log("txHash:", txHash);
      // ui.showToast({
      //   status: "pending",
      //   message: `Sending a transaction... (uploadMakers)`,
      //   txHash
      // });
      toast.success("Sending a transaction...");
    })
    .once("receipt", receipt => {
      // ui.showToast({
      //   status: receipt.status ? "success" : "fail",
      //   message: `Received receipt! It means your transaction is
      //     in klaytn block (#${receipt.blockNumber}) (uploadMakers)`,
      //   link: receipt.transactionHash
      // });
      toast.success("Received receipt!");
      const tokenId = receipt.events.MakersUploaded.returnValues[0];

      console.log("tokenId: ", tokenId);

      sessionStorage.setItem("txList", receipt.transactionHash);

      dispatch(updateFeed(tokenId));
    })
    .once("error", error => {
      console.log(error);
      ui.showToast({
        status: "error",
        message: error.toString(),
      });
    });
};

const initialState = {
  feed: null,
};

const makers = handleActions(
  {
    [SET_FEED]: (state, { payload: feed }) => ({
      ...state,
      feed,
    }),
  },
  initialState,
);

export default makers;
