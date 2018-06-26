// import * as React from "react";
// import * as PropTypes from 'prop-types';
// import StripeCheckout from 'react-stripe-checkout';
// import config from 'config';
// import Axios from "axios";

// class PayButton extends React.Component {
//   constructor(props:any) {
//     super(props);
//      // This binding is necessary to make `this` work in the callback
   
//   }

//  public onToken= (token:any) => { // Token returned from Stripe
//     // const res = await fetch(config.stripe.apiUrl, { // Backend API url
//     //   method: 'POST',
//     //   body: JSON.stringify({
//     //     token,
//     //     charge: {
//     //       amount: this.props.amount,
//     //       currency: config.stripe.currency,
//     //     },
//     //   }),
//     // });

//     Axios.post(config.stripe.apiUrl,{

//       body: JSON.stringify({
            
//             charge: {
//               amount: this.props.amount,
//               currency: config.stripe.currency,
//             },
//             token,
//           }),
// })
    
//     .then(resp => {
//       const data = resp;
//     console.log('onToken'); // Logs for ease of debugging
//     console.log(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
    
//   }
   

//  public render() {
//     return (
//       <StripeCheckout
//         name="Serverless Stripe Store Inc."
//         token={this.onToken}
//         amount={this.props.amount}
//         currency={config.stripe.currency}
//         stripeKey={config.stripe.apiKey} // Stripe publishable API key
//         allowRememberMe={false}
//       />
//     );
//   }
// }

// PayButton.propTypes = {
//   amount: PropTypes.number.isRequired,
// };

// export default PayButton;