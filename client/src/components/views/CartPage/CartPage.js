import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy} from  '../../../_actions/user_actions.js';
import UserCardBlock from './Sections/UserCardBlock.js';
import { Result, Empty, Form, Select, Button } from 'antd';
import emailjs from 'emailjs-com';
import Paypal from '../../utils/Paypal';
import SendEmail from '../../utils/SendEmail.js';

const PaymentMethods = ['Venmo', 'Pay at pickup'];
const { Option } = Select;

function CartPage(props) {
    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [PaymentMethod, setPaymentMethod] = useState(PaymentMethods[0])
    const [OrderId, setOrderId] = useState(0)

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

    const submitHandler = (event) => {
      event.preventDefault();
    }

    const PaymentMethodHandler = (value) => {
      setPaymentMethod(value)
    }

    function sendEmail (event) {
      event.preventDefault()
      let params = {
        "to": props.user.userData.email,
        "html" : 'your order: ' + props.user.cartDetail.title + ' Total is $ '
      }
      emailjs.send("gmail", "test", params, "유얼 API키")
        .then(function(response){
            console.log('Success!', response.status, response.text);
            //setShowTotal(true)
        }, function (err) {
          console.log(err);
        });
    }



    return (
    <div style={{ width : '85%', margin: '3rem auto' }}>
      <Form onSubmit={submitHandler}>
        <h1>My Cart</h1>
        <div>
            <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
        </div>
        <br />
        <label>Payment method</label>
        <br />
        <Select style={{ width: 150 }} onChange={PaymentMethodHandler} value={PaymentMethod}>

          {PaymentMethods.map(item => (
            <Option key={item}> {item} </Option>
          ))}

        </Select>

      { ShowTotal ?
          <div style={{ marginTop: '1rem' }}>
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
        // <Paypal
        //   total={Total}
        //   onSuccess={transcationSuccess}
        // />
        <Button type="primary" block href="./user."
        onClick={sendEmail.bind(this)}>
          Submit your order
        </Button>
      }

    </Form>
    </div>
  )
}

export default CartPage
