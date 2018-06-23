import * as React from "react";
import { IBuyer, IProduct, IUser } from "../../reducers";
import { Link } from "react-router-dom";

interface IProp extends IBuyer, IProduct, IUser {
  buyer: any;
  product: any;
  user: any;
  addToBids: (newBid: any, bids: any[]) => void;
  getBuyer: (username: string) => void;
  getBySellerAndTime: (username: string, time: number) => void;
  putNewBid: (currentBuyer: any) => void;
  updateBidPrice: (price: number) => void;
  updateBidseller: (seller: string) => void;
  updateHighest: (highest: boolean) => void;
  updatePostTimeBid: (time: number) => void;
}

// let holdBuyer :any = {};

export class ItemComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img
                className="card-img-top"
                src={
                  "http://popbay-photo-storage.s3.amazonaws.com/" +
                  this.props.product.chosenItem.photoNames[0]
                }
                alt="Card image cap"
              />
            </div>
            <div className="card col-6">
              <ul className="list-group list-group-flush">
                <br />
                <li className="list-group-item">
                  <h1>{this.props.product.chosenItem.name}</h1>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <h3>
                      Buy Now: ${this.props.product.chosenItem.buyNowPrice +
                        "  "}
                    </h3>
                    <Link to="/checkout">
                      <button className="btn btn-success"> Buy </button>
                    </Link>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <h3>
                      Current Bidding Price: ${this.props.product.chosenItem
                        .currentBidPrice + "  "}
                    </h3>
                    <button className="btn btn-warning"> Place a bid </button>
                  </div>
                </li>
                <li className="list-group-item">
                  <h5>
                    Auction ends in{" "}
                    {this.props.product.chosenItem.auctionEndTime} hours
                  </h5>
                </li>
                <li className="list-group-item">
                  <h5>Category: {this.props.product.chosenItem.category}</h5>
                </li>
                <li className="list-group-item">
                  <h5>Type: {this.props.product.chosenItem.type}</h5>
                </li>
                <li className="list-group-item">
                  <h5>Condition: {this.props.product.chosenItem.condition}</h5>
                </li>
              </ul>
              <div className="card-body">a couple items</div>
            </div>
          </div>
        </div>
        We need to add lots of the little updating functions, but not the one
        for Time.
        <br />
        When someone chooses to place a bid by hitting the button,
        <br />
        We will call this.props.getBuyer(this.props.user.username)
        <br />
        for the buyer mentioned on the product's currentBidder field.
        <br />
        After the bid-submit button is pressed, we need to store the current
        user's info and bid in the holding variable holdBuyer.
        <br />
        This is because we need to update the isHighestBid field of THAT user's
        bid(s) on this product to false.
        <br />
        Then we pull stuff out of holdBuyer so that we can:
        this.props.addToBids(this.props.buyer.newBid,
        this.props.buyer.currentBuyer.bids) with the bid info we stored.
      </div>
    );
  }
}
