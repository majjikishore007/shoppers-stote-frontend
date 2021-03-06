import Dropin from 'braintree-web-drop-in-react';
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/helper/index';
import { cartEmpty } from './helper/Carthelper';
import { createOrder } from './helper/OrderHelper';
import { getMeToken, processPayment } from './helper/paymentsBhelper';

const PaymentB = ({
  products,
  totalAmount,
  setreload = (f) => f,
  reload = undefined,
}) => {
  const [info, setinfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
  });
  const [isSuccess, setisSuccess] = useState(false);
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token);
  }, []);
  const onPurchase = () => {
    setinfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: totalAmount,
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setinfo({ ...info, success: response.success });
          setisSuccess(true);
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {});
          //reload after emptying the cart
          setreload(!reload);
        })
        .catch((error) => {
          setinfo({ ...info, error: error });
        });
    });
  };

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log('INFO :', info);
      if (info.error) {
        setinfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setinfo({ clientToken });
      }
    });
  };
  const showbtDropdown = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <Dropin
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button onClick={onPurchase}>Buy</button>
          </div>
        ) : (
          <div className='alert alert-danger mt-3'>
            <h4> carty is empty </h4>
          </div>
        )}
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div
        className='alert alert-success mt-3'
        style={{ display: isSuccess ? '' : 'none' }}
      >
        <h4> purchage done successfully </h4>
      </div>
    );
  };
  return (
    <div>
      {token ? (
        <h3>Total purchage Amount : {totalAmount}$</h3>
      ) : (
        <div className='alert alert-danger mt-3'>
          <h4> please signin </h4>
        </div>
      )}
      {showbtDropdown()}
      {successMessage()}
    </div>
  );
};

export default PaymentB;
