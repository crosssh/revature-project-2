import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import { IProduct, IUser } from "../../reducers";

interface IProp extends IProduct, IUser {
  product: any;
  user: any;
  clearList: () => void;
  getSeller: (username: string) => void;
}

export class SellingComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.clearList();
    this.props.getSeller(this.props.user.username)
  }

  public componentWillUnmount() {
    this.props.clearList();
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-10">
          <h1>{this.props.user.username}'s posted items</h1>
          {this.props.user.authToken ?
            <div className="row">
              {this.props.product.productList.length > 0 ?
                this.props.product.productList.map((product: any) => (
                  <div
                    className="card pop-card"
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
                        Category: {product.category}
                      </li>
                      <li className="list-group-item">
                        Type: {product.type}
                      </li>
                      <li className="list-group-item">
                        Condition: {product.condition}
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
                    </ul>
                  </div>
                )) :
                <h5 className="indented">Aren't selling anything right now? Click on "Add New POP" in the sidebar to get started!</h5>
              }
            </div>
            : <h1>Sign in to see the POPS you are selling!</h1>
          }
        </div>
      </div>
    );
  }
}
