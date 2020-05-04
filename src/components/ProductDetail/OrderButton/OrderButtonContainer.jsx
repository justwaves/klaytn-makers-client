import React from "react";
import { useDispatch } from "react-redux";
import { orderProduct } from "redux/modules/order";

import OrderButton from "./OrderButton";

const OrderButtonContainer = ({ makersId, price }) => {
  const dispatch = useDispatch();

  const onOrder = async () => {
    console.log("makersId: ", makersId);
    try {
      await dispatch(orderProduct({ makersId, price }));
    } catch (e) {
      alert(`상품 등록에 실패하였습니다. error: ${e}`);
    }
  };

  return <OrderButton onOrder={onOrder} />;
};

export default OrderButtonContainer;
