import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy} from  '../../../_actions/user_actions.js';
import UserCardBlock from './Sections/UserCardBlock.js';
import { Result, Empty } from 'antd';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {

      let cartItems = [];
      if (props.user.userData && props.user.userData.cart) {
          if (props.user.userData.cart.length > 0) {
              props.user.userData.cart.forEach(item => {
                  cartItems.push(item.id)
              });

              dispatch(getCartItems(cartItems, props.user.userData.cart))
              .then(response => { calculateTotal(response.payload) })

        }
      }
    }, [props.user.userData])

    let calculateTotal = (cartDetail) => {
      let total = 0;
      cartDetail.map(item => {
        total += parseFloat(item.price, 10) * item.quantity
      })
      setTotal(total);
      setShowTotal(true);
    }

    let removeFromCart = (productId) => {

      dispatch(removeCartItem(productId))
      .then(response => {
          if(response.payload.productInfo.length <= 0) {
            setShowTotal(false);
          }
      })
    }

    const transcationSuccess = (data) => {
      dispatch(onSuccessBuy({
        paymentData: data,
        cartDetail: props.user.cartDetail
      }))
        .then(response => {
          if(response.payload.success) {
            setShowTotal(false)
            setShowSuccess(true)
          }
        })
    }

    return (
    <div style={{ width : '85%', margin: '3rem auto' }}>
        <h1>My Cart</h1>
        <div>
            <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
        </div>



    { ShowTotal ?
        <div style={{ marginTop: '3rem' }}>
            <h2>Total Amount: ${Total}</h2>
        </div>
        : ShowSuccess?
          <Result
            status="success"
            title="Successfully Purchased Items"
          />
          :
            <>
              <br />
              <Empty description={false} />
              <p>No Items in the Cart</p>
            </>
    }

    {ShowTotal &&
      <Paypal
        total={Total}
        onSuccess={transcationSuccess}
      />

    }

    </div>
  )
}

export default CartPage
