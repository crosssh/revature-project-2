import * as React from "react";
import { IBuyer, IUser, IProduct } from "../../reducers";

interface IProp extends IBuyer, IProduct, IUser {
  buyer: any;
  product: any;
  user: any;
  addToBought: (boughtItem: any, boughtItems: any[]) => void;
  getBuyer: (username: string) => void;
  putNewBid: (currentBuyer: any) => void;
  putProduct: (chosenProduct: string) => void;
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
  }

  public componentDidMount() {
    this.props.getBuyer(this.props.user.username);
    this.props.updateBoughtPrice(this.props.product.chosenItem.buyNowPrice);
    this.props.updateBoughtSeller(this.props.product.chosenItem.username);
    this.props.updateItemNameBought(this.props.product.chosenItem.name);
    this.props.updateBoughtTime(Date.now());
    this.props.updatePostTimeBought(this.props.product.chosenItem.timePosted);
    this.props.updateStatus("sold");
  }

  public checkout = (e: any) => {
    e.preventDefault();
    this.props.addToBought(this.props.buyer.newBoughtItem, this.props.buyer.currentBuyer.boughtItems);
    this.forceUpdate(() => {
      this.props.putNewBid(this.props.buyer.currentBuyer)
    })
    this.props.putProduct(this.props.product.chosenItem);
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