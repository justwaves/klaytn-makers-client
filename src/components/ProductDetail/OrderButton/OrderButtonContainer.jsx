import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderProduct } from 'redux/modules/order';
import { useHistory } from 'react-router';

import OrderButton from './OrderButton';

const OrderButtonContainer = ({ makersId, price }) => {
  const [klaytnLoading, setKlaytnLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, receipt } = useSelector(({ order, loading }) => ({
    receipt: order.receipt,
    loading: loading['order/ORDER_PRODUCT'],
  }));

  const onOrder = async () => {
    console.log('makersId: ', makersId);
    try {
      await dispatch(orderProduct({ makersId, price }));
    } catch (e) {
      console.log(e.toSting());
    }
  };

  useEffect(() => {
    if (loading) {
      if (!receipt) {
        setKlaytnLoading(true);
        console.log('Klaytn contract API loading...');
      }

      if (receipt) {
        setKlaytnLoading(false);
      }
    }
  }, [receipt, history, loading]);

  return (
    <OrderButton
      onOrder={onOrder}
      loading={loading}
      klaytnLoading={klaytnLoading}
    />
  );
};

export default OrderButtonContainer;
