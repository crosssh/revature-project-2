import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import { IBuyer, IUser, IProduct } from "../../reducers";

interface IProp extends IBuyer, IProduct, IUser {
  buyer: any;
  product: any;
  user: any;
  getBuyer: (username: string) => Promise<any>;
  getBySellerAndTime: (username: string, timePosted: number) => Promise<any>;
}

export class BoughtComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemList: []
    };
  }

  public componentDidMount() {
    this.props.getBuyer(this.props.user.username)
      .then(resp => {
        for (let i = 0; i < this.props.buyer.currentBuyer.boughtItems.length; i++) {
          this.props
            .getBySellerAndTime(
              this.props.buyer.currentBuyer.boughtItems[i].seller,
              this.props.buyer.currentBuyer.boughtItems[i].timePosted
            )
            .then(res => {
              this.setState({
                itemList: this.state.itemList.push(this.props.product.chosenItem)
              });
              console.log(this.state.itemList);
            })
            .catch(err => console.log(err)); // Tell them we can't load info?
        }
      })
      .catch(err => {
        console.log("");
      });
  }

  public render() {
    return (
      <div className="row">
        {/* {this.props.buyer.currentBuyer.boughtItems} */}
        <ProfileNavComponent />
        <div className="col-10">
          {/* HERE make conditional on being logged in so it doesn't break. */}

          <div className="row">
            <h2>
              Previously purchased items for{" "}
              {this.props.buyer.currentBuyer.username}
            </h2>
          </div>
          <div className="row">
            {this.state.itemList.length > 0 &&
              this.state.itemList.map((product: any) => (
                <div
                  className="card pop-card home-pop-card"
                  key={product.timePosted}
                >
                  {/* <div className="card-title">
                  <h5>{product.name}</h5>
                </div> */}
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
                    <li className="list-group-item">Type: {product.type}</li>
                    <li className="list-group-item">
                      Condition: {product.condition}
                    </li>
                  </ul>
                  <div className="card-body">
                    a couple items
                    {/* insert React-router-dom links instead
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
