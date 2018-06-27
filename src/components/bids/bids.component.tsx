import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import { IBuyer, IUser, IProduct } from "../../reducers";
import { Link } from "react-router-dom";
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface IProp extends IBuyer, IProduct, IUser {
  buyer: any;
  product: any;
  user: any;
  getBuyer: (username: string) => Promise<any>;
  getBySellerAndTime: (username: string, timePosted: number) => Promise<any>;
  reinitializeProduct: () => void;
  updatePhotos: (file: any, photos: any[]) => void;
}

export class BidsComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.reinitializeProduct();
    const username: any = localStorage.getItem('username');
    this.props.getBuyer(username)
      .then(resp => {
        for (let i = 0; i < this.props.buyer.currentBuyer.bids.length; i++) {
          this.props
            .getBySellerAndTime(
              this.props.buyer.currentBuyer.bids[i].seller,
              this.props.buyer.currentBuyer.bids[i].timePosted
            )
            .then(res => {
              this.props.updatePhotos(this.props.product.chosenItem, this.props.product.photos);
            })
            .catch(err => console.log(err)); // Tell them we can't load info?
        }
      })
      .catch(err => {
        console.log("");
      });
  }
  public componentWillUnmount() {
    this.props.reinitializeProduct();
  }

  public formatTime = (time: any) => {
    const newTime = new Date(time);
    return 'on ' + newTime.toDateString() +' at ' + newTime.toLocaleTimeString()
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        {localStorage.getItem('token') ?
          <div className="col-10">
            <div className="row">
              <div className="col">
                <h1>
                  Previous bids for{" "}
                  {this.props.buyer.currentBuyer.username}
                </h1>
              </div>
              <div className="col-7">
                <h6 className="italic indented">Don't see a bid you're expecting? It may have already been bought by someone.</h6>
              </div>
            </div>
            <div className="row">
              {this.props.product.photos.length > 0 ?
                this.props.product.photos.map((product: any) => (
                  
                  product.status === "available" &&
                  <ReactCSSTransitionGroup transitionName = "example"
                  transitionAppear = {true} transitionAppearTimeout = {700}
                  transitionEnter = {false} transitionLeave = {false}>
                  
                   
                  <div
                    className="card pop-card profile-pop-card"
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
                        Highest Bidder: {product.currentBidder === this.props.user.username ? 'Me' : product.currentBidder}
                      </li>
                      <li className="list-group-item">
                        Current Bid Price: ${product.currentBidPrice}
                      </li>
                      <li className="list-group-item">Type: {product.type}</li>
                      <li className="list-group-item">
                        Condition: {product.condition}
                      </li>
                      <li className="list-group-item">Bid ends {this.formatTime(product.auctionEndTime)}</li>
                    </ul>
                    <div className="card-body">
                      Seller: {product.username}

                    </div>
                  </div>
                  </ReactCSSTransitionGroup>
                )) :
                
                <div className="row">
                  <h5 className="indented">Don't have any bids yet? Head over to our browse page to see what's available!</h5>
                  <Link to='/browse'>
                    <button className=" indented btn btn-danger">Browse</button>
                  </Link>
                </div>
              }
            </div>
          </div>
          : <h1>Sign in to see your previous bids</h1>
        }
      </div>
    );
  }
}
