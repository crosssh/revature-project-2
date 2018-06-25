import * as React from "react";
import { IBuyer, IProduct, IUser } from "../../reducers";
import { Link } from "react-router-dom";

interface IProp extends IBuyer, IProduct, IUser {
  buyer: any;
  product: any;
  user: any;
  addToBids: (newBid: any, bids: any[]) => void;
  getBuyer: (username: string) => Promise<any>;
  getBySellerAndTime: (username: string, time: number) => void;
  putNewBid: (currentBuyer: any) => void;
  updateBidPrice: (price: number) => void;
  updateBidSeller: (seller: string) => void;
  updateHighest: () => void;
  updatePostTimeBid: (time: number) => void;
}

let holdBuyer: any = {};
// let isReady: boolean = false;

export class ItemComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      bidding: false
    };
  }

  public isBidding = (e: any) => {
    this.setState({ bidding: true });
  };

  public updateBidPrice = (e: any) => {
    const price = parseInt(e.target.value, 10);
    this.props.updateBidPrice(price);
  };

  public submitBid = (e: any) => {
    e.preventDefault();
    console.log(this.props.product.chosenItem.currentBidder);
    if (this.props.product.chosenItem.currentBidder !== "N/A") {
      this.props
        .getBuyer(this.props.product.chosenItem.currentBidder)
        .then(resp => {
          // this.props.updateHighest(); I think not!
          holdBuyer = this.props.buyer.currentBuyer;
          console.log(holdBuyer);
          for (let i = 0; i < holdBuyer.bids.length; i++) {
            if (
              holdBuyer.bids[i].seller ===
                this.props.product.chosenItem.username &&
              holdBuyer.bids[i].timePosted ===
                this.props.product.chosenItem.timePosted
            ) {
              console.log(holdBuyer.bids[i]);
              holdBuyer.bids[i].highestBid = false;
            }
          }
          // isReady = true;
        })
        .catch(err => {
          console.log(err);
        });
      setTimeout(() => {
        this.props.putNewBid(holdBuyer);
      }, 1000);
    }

    this.props
      .getBuyer(this.props.user.username)
      .then(resp => {
        this.props.addToBids(
          this.props.buyer.newBid,
          this.props.buyer.currentBuyer.bids
        );
        this.forceUpdate(() => {
          console.log(this.props.buyer.currentBuyer);
          this.props.putNewBid(this.props.buyer.currentBuyer);
        });
      })
      .catch(err => {
        console.log(err);
        // add error message saying you must log in
      });
  };

  public componentDidMount() {
    this.props.updateBidSeller(this.props.product.chosenItem.username);
    this.props.updatePostTimeBid(this.props.product.chosenItem.timePosted);
    // make error message = ''
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
                    <div className="col-4">
                      <h3>
                        Current Bidding Price: ${this.props.product.chosenItem
                          .currentBidPrice + "  "}
                      </h3>
                    </div>
                    <div className="col">
                      <button className="btn btn-link" onClick={this.isBidding}>
                        {" "}
                        Place a bid{" "}
                      </button>
                    </div>
                  </div>
                  {/* Here add additional or extend guard operator 
                  so that if authtoken isn't a thing, you can't bid and message is displayed */}
                  {this.state.bidding && (
                    <form onSubmit={this.submitBid}>
                      <div className="row">
                        <input
                          value={this.props.buyer.newBid.bidPrice}
                          onChange={this.updateBidPrice}
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                        />
                        <button className="btn btn-warning" type="submit">
                          {" "}
                          Submit Bid{" "}
                        </button>
                        {/* add  success message*/}
                      </div>
                    </form>
                  )}
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
      </div>
    );
  }
}
