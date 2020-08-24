import React from 'react'
import emailjs from 'emailjs-com';

function SendEmail(props) {

  function sendEmail (event) {
    event.preventDefault()
    let params = {
      "to": props.user.userData.email,
      "html" : 'your order: ' + props.user.cartDetail.title + ' Total is $ '
    }
    emailjs.send("gmail", "test", params, "user_v1BujmvzugCyaZPbndaMu")
      .then(function(response){
          console.log('Success!', response.status, response.text);
          //setShowTotal(true)
      }, function (err) {
        console.log(err);
      });

  }
  return (
    <div>
        {/* //{ShowTotal &&
        // <Paypal
        //   total={Total}
        //   onSuccess={transcationSuccess}
        // />
        // <Button type="primary" block
        // onClick={sendEmail.bind(this)}>
        //   Submit your order
        // </Button>
  } */}
    </div>
  )
}

export default SendEmail
