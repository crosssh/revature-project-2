import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import { IProduct, IUser } from "../../reducers";

interface IProp extends IProduct, IUser {
  product: any;
  user: any;
  clearList: () => void;
  getBySellerAndTime: (username: string, timePosted: number) => Promise<any>;
  getSeller: (username: string) => void;
  putProduct: (product: any) => void;
  updateStatus: (status: string) => void;
}


export class SellingComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.clearList();
    const username: any = localStorage.getItem('username');
    this.props.getSeller(username)
  }

  public componentWillUnmount() {
    this.props.clearList();
  }

  public formatTime = (time: any) => {
    const newTime = new Date(time);
    return newTime.toDateString() + ' at ' + newTime.toLocaleTimeString()
  }

  public removeProduct = (username: string, timePosted: number) => (e: any) => {
    this.props
      .getBySellerAndTime(
        username,
        timePosted
      )
      .then(res => {
        this.props.updateStatus('removed from sale');

        this.forceUpdate(() => {
          this.props.putProduct(this.props.product.chosenItem);
        })
      })
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        {localStorage.getItem('token') ?
          <div className="col-10">
            <h1>{localStorage.getItem('username')}'s posted items</h1>
            <div className="row">

              {this.props.product.productList.length > 0 ?
                this.props.product.productList.map((product: any) => (
                  <div
                    className="card static pop-card profile-pop-card"
                    key={product.timePosted}
                  >
                    <img
                      className="card-img-top pop-card-img"
                      src={
                        "http://popbay-photo-storage.s3.amazonaws.com/" +
                        product.photoNames[0]
                      }
                      alt="Card image cap"
                    />
                    <div className="card-title">
                      <h5>{product.name}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Auction {product.status === 'available'
                          ? 'ends ' + this.formatTime(product.auctionEndTime)
                          : 'has ended'}
                      </li>
                      <li className="list-group-item">
                        Current Bid: ${product.currentBidPrice
                          ? product.currentBidPrice
                          : product.minimumBidPrice} <br />
                        Current Bidder: {product.currentBidder}
                      </li>
                      <li className="list-group-item">
                        Buy Now Price: ${product.buyNowPrice}
                      </li>
                      <li className="list-group-item">
                        Status: {product.status}
                      </li>
                      <li className="list-group-item">
                        Category: {product.category}
                      </li>
                      <li className="list-group-item">
                        Type: {product.type}
                      </li>
                      <li className="list-group-item">
                        Condition: {product.condition}
                      </li>
                    </ul>
                    <div className="card-body">
                      {product.status === "available" &&
                        <button className="btn btn-sm btn-secondary" onClick={this.removeProduct(product.username, product.timePosted)}>Withdraw from sale</button>
                      }
                    </div>
                  </div>
                )) :
                <h5 className="indented">Aren't selling anything right now? Click on "Add New POP" in the sidebar to get started!</h5>
              }
            </div>
          </div>
          : <h1>Sign in to see the POPS you are selling!</h1>
        }
      </div>
    );
  }
}
