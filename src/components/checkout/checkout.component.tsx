import * as React from "react";
import { IBuyer, IUser, IProduct } from "../../reducers";

interface IProp extends IBuyer, IProduct, IUser {
  buyer: any;
  product: any;
  user: any;
  addToBought: (boughtItem: any, boughtItems: any[]) => void;
  getBuyer: (username: string) => void;
  putNewBid: (currentBuyer: any) => void;
  updateBoughtPrice: (price: number) => void;
  updateBoughtseller: (seller: string) => void;
  updateBoughtTime: (time: number) => void;
  updatePostTimeBought: (time: number) => void;
}

export class CheckoutComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public componentDidMount() {
    this.props.getBuyer(this.props.user.username);
  }

  public checkout = (e: any) => {
    e.preventDefault();


    // call api for pay pal if that succeeds then 
    // all the funciton will be called here to update the bought item information
    // if the pay pal fails display error message
  }

  public render() {
    return (
      <div className="container">
        <h5>Checkout.</h5>
        <div className="container checkout">
        <div className="item-information row">
          <div className="col-8">
            <p>Item to be purchased will go here></p>
          </div>
          <div className="col-4">
            <p>cost of item will go here</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <p>seller name goes here</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-secondary btn-sm float-right" onClick={this.checkout}>checkout</button>
          </div>
        </div>
        </div>
      </div>
    );
  }
}


{/* <br />
        We need to add lots of the little updating functions, but not the ones
        for Time.
        <br />
        We will call this.props.getBuyer(this.props.user.username)
        <br />
        So that we can this.props.addToBought(this.props.buyer.newBoughtItem,
        this.props.buyer.currentBuyer.boughtItems)
        <br />
        If you think this is kind of a long way to get at things, well, you're
        not wrong. */}