import * as React from "react";
import { IBuyer, IProduct, IUser } from "../../reducers";

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
            <div
              className="card col-3"
              key={this.props.product.chosenItem.timePosted}
            >
              {/* <div className="card-title">
                  <h5>{product.name}</h5>
                </div> */}
              <img
                className="card-img-top"
                src={
                  "http://popbay-photo-storage.s3.amazonaws.com/" +
                  this.props.product.chosenItem.photoNames[0]
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
                <li className="list-group-item">
                  Type: {this.props.product.chosenItem.type}
                </li>
                <li className="list-group-item">
                  Condition: {this.props.product.chosenItem.condition}
                </li>
              </ul>
              <div className="card-body">
                a couple items
                {/* insert React-router-dom links instead
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a> */}
              </div>
            </div>
          </div>
        </div>
        This is a page for an individual item That somehow when we clicked on it
        it retreived that single item, probably with
        this.props.getBySellerAndTime(), whose parameters it got from the array
        displayed on the previous page... somehow...
        <br />
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
        Then by one way or another we can pull stuff out of holdBuyer so that we
        can: this.props.addToBids(this.props.buyer.newBid,
        this.props.buyer.currentBuyer.bids) with the bid info we stored.
        <br />
        If you think this is kind of a long way to get at things, well, you're
        not wrong.
      </div>
    );
  }
}
