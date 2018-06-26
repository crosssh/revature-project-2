import * as React from "react";
import { IBuyer, IUser, IProduct } from "../../reducers";
import Layout from 'src/components/checkout/layout-component';
import StripeCheckout from 'react-stripe-checkout';
import config from 'src/components/checkout/config';
import Axios from "axios";

interface IProp extends IBuyer, IProduct, IUser {
  buyer: any;
  product: any;
  user: any;
  addToBought: (boughtItem: any, boughtItems: any[]) => void;
  getBuyer: (username: string) => void;
  putNewBid: (currentBuyer: any) => void;
  putProduct: (chosenProduct: any) => void;
  updateBoughtPrice: (price: number) => void;
  updateBoughtSeller: (seller: string) => void;
  updateBoughtTime: (time: number) => void;
  updateItemNameBought: (itemName: string) => void;
  updatePostTimeBought: (time: number) => void;
  updateStatus: (status: string) => void;

}

export class CheckoutComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);

    this.state = {
      amount: 1000,
      errorMsg: "",
    }
  }

  public onToken = (token: any) => {
    Axios.post(config.stripe.apiUrl,

      JSON.stringify({

        charge: {
          amount: this.state.amount,
          currency: config.stripe.currency,
        },
        token,
      }),
    )
      .then(resp => {
        const data = (resp);

        console.log('onToken'); // Logs for ease of debugging
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public componentDidMount() {
    if (this.props.user.username !== "" && this.props.product.chosenItem !== null) {
      this.props.getBuyer(this.props.user.username);
      this.props.updateBoughtPrice(this.props.product.chosenItem.buyNowPrice);
      this.props.updateBoughtSeller(this.props.product.chosenItem.username);
      this.props.updateItemNameBought(this.props.product.chosenItem.name);
      this.props.updateBoughtTime(Date.now());
      this.props.updatePostTimeBought(this.props.product.chosenItem.timePosted);
      this.props.updateStatus("sold");
      this.setState({ amount: this.props.product.chosenItem.buyNowPrice })
    } else {
      this.setState({
        errorMsg: "Must be logged in to checkout."
      })
    }
  }

  public checkout = (e: any) => {
    e.preventDefault();
    this.props.addToBought(
      this.props.buyer.newBoughtItem,
      this.props.buyer.currentBuyer.boughtItems
    );
    this.forceUpdate(() => {
      this.props.putNewBid(this.props.buyer.currentBuyer);
    });
    this.props.putProduct(this.props.product.chosenItem);
  }

  public getPrice = () => {
    if (this.props.product.chosenItem.buyNowPrice > this.props.product.chosenItem.currentBidPrice) {
      return this.props.product.chosenItem.buyNowPrice;
    } else {
      return this.props.product.chosenItem.currentBidPrice;
    }
  }

  public render() {
    return (
      <div className="container">
        {this.props.user.username !== "" && this.props.product.chosenItem !== null &&
          <div className="row checkout">
            <div className="col-5">
              <div className="checkout-pop-card">
                <img
                  className="card-img-top img-fluid"
                  src={
                    "http://popbay-photo-storage.s3.amazonaws.com/" + this.props.product.chosenItem.photoNames[0]
                  }
                  alt="Card image cap"
                />
                <div className="card-title">
                  <h5>{this.props.product.chosenItem.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Category: {this.props.product.chosenItem.category}
                  </li>
                  <li className="list-group-item">Type: {this.props.product.chosenItem.type}</li>
                  <li className="list-group-item">
                    Condition: {this.props.product.chosenItem.condition}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-7 checkout-seller-info">
              <div className="row">
                <h5 className="checkout-seller font-weight-bold">Seller: </h5><h5 className="checkout-seller">{this.props.product.chosenItem.username}</h5>
              </div><div className="row">
                <h5 className="checkout-seller font-weight-bold">Price: </h5><h5 className="checkout-seller">{this.getPrice()}</h5>
              </div>
              <div className="row bottom">
                <div className="col-auto">
                  <button className="btn btn-secondary" onClick={this.checkout}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        }
        <div>
          <h5 className="checkout-err" id="error-message">{this.state.errorMsg}</h5>
        </div>
        <div>
          <h1>Serverless Stripe Checkout</h1>
          <p>Use test@email.com, 4242 4242 4242 4242, and any CVC and future expiration date.</p>
          <Layout>
            <StripeCheckout
              name="Serverless Stripe Store Inc."
              token={this.onToken}
              amount={this.state.amount}
              currency={config.stripe.currency}
              stripeKey={config.stripe.apiKey} // Stripe publishable API key
              allowRememberMe={false}
            />
          </Layout>
        </div>
      </div>
    );
  }
}
