import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import { IBuyer, IUser, IProduct } from "../../reducers";
import { Link } from "react-router-dom";
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface IProp extends IBuyer, IProduct, IUser {
  buyer: any;
  product: any;
  user: any;
  clearItem: () => void;
  getBuyer: (username: string) => Promise<any>;
  getBySellerAndTime: (username: string, timePosted: number) => Promise<any>;
  reinitializeProduct: () => void;
  updatePhotos: (file: any, photos: any[]) => void;
}

export class BoughtComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.reinitializeProduct();
    const username: any = localStorage.getItem('username');
    this.props.getBuyer(username)
      .then(resp => {
        for (let i = 0; i < this.props.buyer.currentBuyer.boughtItems.length; i++) {
          this.props
            .getBySellerAndTime(
              this.props.buyer.currentBuyer.boughtItems[i].seller,
              this.props.buyer.currentBuyer.boughtItems[i].timePosted
            )
            .then(res => {
              this.props.updatePhotos(this.props.product.chosenItem, this.props.product.photos);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => {
        console.log("");
      });
  }

  public componentWillUnmount() {
    this.props.reinitializeProduct();
    this.props.clearItem();
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-10">
          {localStorage.getItem('token') ?
            <div className="container">
              <div className="row">
                <h1 className="bubble-font">
                  Previously purchased items for{" "}
                  {this.props.buyer.currentBuyer.username}
                </h1>
              </div>
              <div className="row">
                {this.props.product.photos.length > 0 ?
                  this.props.product.photos.map((product: any) => (
                    <ReactCSSTransitionGroup transitionName="example"
                      transitionAppear={true} transitionAppearTimeout={700}
                      transitionEnter={false} transitionLeave={false}>
                      <div
                        className="card static pop-card profile-pop-card grow pop-card-no-cursor"
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
                            Item Price: ${product.buyNowPrice}
                          </li>
                          <li className="list-group-item">Type: {product.type}</li>
                          <li className="list-group-item">
                            Condition: {product.condition}
                          </li>
                        </ul>
                        <div className="card-body">
                          Seller: {product.username}
                        </div>
                      </div>
                    </ReactCSSTransitionGroup>
                  )) :
                  <div className="row">
                    <h5 className="indented">No purchases yet? Take a look at our browse page to see what's available!</h5>
                    <Link to='/browse'>
                      <button className="indented btn btn-danger">Browse</button>
                    </Link>
                  </div>
                }
              </div>
            </div>
            : <h1>Sign in to see your previously purchased items</h1>
          }
        </div>
      </div>
    );
  }
}
