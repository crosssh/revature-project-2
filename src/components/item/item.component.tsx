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
  putProduct: (chosenItem: any) => void;
  updateBidPrice: (price: number) => void;
  updateBidSeller: (seller: string) => void;
  updatePostTimeBid: (time: number) => void;
  updateCurrentBid: (price: number) => void;
  updateBidder: (username: string) => void;
}

let holdBuyer: any = {};

export class ItemComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      bidding: false,
      currentPhoto: "",
      errMsg: "",
    };
  }

  public isBidding = (e: any) => {
    console.log(this.props.user.authToken);
    if (this.props.user.authToken) {
      this.setState({
        bidding: true
      });
    } else {
      this.setState({
        errMsg: "You must log in to bid"
      });
    }
  };

  public updateBidPrice = (e: any) => {
    const price = parseFloat(e.target.value);
    this.props.updateBidPrice(price);
  };

  public submitBid = (e: any) => {
    e.preventDefault();
    if (this.props.user.username === this.props.product.chosenItem.username) {
      this.setState({
        errMsg: "You may not not bid on your own item"
      });
    } else if (
      this.props.buyer.newBid.bidPrice <=
      this.props.product.chosenItem.currentBidPrice ||
      this.props.buyer.newBid.bidPrice <
      this.props.product.chosenItem.minimumBidPrice
    ) {
      this.setState({
        errMsg: "Bid must be greater than current bid price"
      });
    } else {
      if (this.props.product.chosenItem.currentBidder !== "N/A") {
        this.props
          .getBuyer(this.props.product.chosenItem.currentBidder)
          .then(resp => {
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
          })
          .catch(err => {
            console.log(err);
          });
        setTimeout(() => {
          this.props.putNewBid(holdBuyer);
        }, 1000);
      }
      this.props.updateBidder(this.props.user.username);
      this.props.updateCurrentBid(this.props.buyer.newBid.bidPrice);

      this.props
        .getBuyer(this.props.user.username)
        .then(resp => {
          this.props.addToBids(
            this.props.buyer.newBid,
            this.props.buyer.currentBuyer.bids
          );
          this.forceUpdate(() => {
            this.props.putNewBid(this.props.buyer.currentBuyer);
            this.props.putProduct(this.props.product.chosenItem);
            this.setState({
              errMsg: "Bid submitted"
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  public componentDidMount() {
    if (this.props.product.chosenItem) {
      this.props.updateBidSeller(this.props.product.chosenItem.username);
      this.props.updatePostTimeBid(this.props.product.chosenItem.timePosted);
      if(this.props.product.chosenItem.photoNames[0] !== null) {
        this.changeImage(this.props.product.chosenItem.photoNames[0])
      }
    }

    this.setState({
      errMsg: ""
    });
  }

  public componentWillUnmount() {
    this.props.updateBidPrice(0);
  }

  public changeImage = (img: string) =>{
    console.log(img)
    this.setState({
      currentPhoto: img,
    })
  }

  public changeImageOnClick = (img: string) => (e: any) => {
    console.log(img)
    this.setState({
      currentPhoto: img,
    })
  } 

  public render() {
    return (
      <div>
        {this.props.product.chosenItem !== null && (
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img
                  className="card-img-top"
                  src={
                    "http://popbay-photo-storage.s3.amazonaws.com/" + this.state.currentPhoto
                  }
                  alt="Card image cap"
                />
                <div className="row">
                  {
                    this.props.product.chosenItem.photoNames !== null &&
                    this.props.product.chosenItem.photoNames.map((image: any) => (
                      <img
                        className="card-img-top item-img"
                        src={
                          "http://popbay-photo-storage.s3.amazonaws.com/" + image
                        }
                        alt="Card image cap"
                        onClick={this.changeImageOnClick(image)}
                      />
                    )
                    )
                  }
                </div>
              </div>
              <div className="card col-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h1>{this.props.product.chosenItem.name}</h1>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-6">
                        <h3>
                          Buy Now: ${this.props.product.chosenItem.buyNowPrice +
                            "  "}
                        </h3>
                      </div>
                      <div className="col">
                        <Link to="/checkout">
                          <button className="btn btn-success"> Buy Now</button>
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <h3>
                        Current Bidding Price: $
                        {this.props.product.chosenItem.currentBidPrice
                          ? this.props.product.chosenItem.currentBidPrice
                          : this.props.product.chosenItem.minimumBidPrice}
                      </h3>
                    </div>
                    {this.state.bidding && (
                      <form onSubmit={this.submitBid}>
                        <div className="row">
                          <div className="col-4">
                            <input
                              value={this.props.buyer.newBid.bidPrice}
                              onChange={this.updateBidPrice}
                              type="number"
                              className="form-control"
                              placeholder="Amount"
                            />
                          </div>
                          <div className="col">
                            <button className="btn btn-warning" type="submit">
                              {" "}
                              Submit Bid{" "}
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </li>
                  <li className="list-group-item error-words">
                    {this.state.bidding ? (
                      this.state.errMsg
                    ) : (
                        <button className="btn btn-link" onClick={this.isBidding}>
                          {" "}
                          Place a bid{" "}
                        </button>
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
                    <h5>
                      Condition: {this.props.product.chosenItem.condition}
                    </h5>
                  </li>
                </ul>
                <div className="card-body">a couple items</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
