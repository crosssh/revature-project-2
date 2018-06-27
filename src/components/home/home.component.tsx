import * as React from "react";
import { RouteProps } from "react-router";
import { IProduct } from "../../reducers";
import { environment } from "../../environment";
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Axios from "axios";

interface IProps extends IProduct, RouteProps {
  history: any;
  getRecent: () => void;
  getUrl: (url: string) => string;
  getBySellerAndTime: (username: string, timePosted: number) => Promise<any>;
  updateUrl: (url: string) => void;
}

export class HomeComponent extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.getRecent();
  }

  public getRecent = () => {
    this.props.getRecent();
  };

  public getUrl = (filename: string) => {
    console.log(filename);
    Axios.get(environment.context + "product/get-photo/" + filename)
      .then(resp => {
        this.props.updateUrl(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
    return this.props.url;
  };

  public selectItem = (username: string, timePosted: number) => (e: any) => {
    this.props
      .getBySellerAndTime(username, timePosted)
      .then(resp => {
        this.props.history.push("/item");
      })
      .catch(err => console.log(err));
  };

  public formatTime = (time: any) => {
    const newTime = new Date(time);
    return 'on ' + newTime.toDateString() +' at ' + newTime.toLocaleTimeString()
  }

  public render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.productList.length > 0 &&
            this.props.productList.map((product: any) => (
              <ReactCSSTransitionGroup transitionName = "example"
                  transitionAppear = {true} transitionAppearTimeout = {700}
                  transitionEnter = {false} transitionLeave = {false}>
              <div
                className="card pop-card home-pop-card"
                key={product.timePosted}
                onClick={this.selectItem(product.username, product.timePosted)}
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
                  <li className="list-group-item">Bid ends {this.formatTime(product.auctionEndTime)}</li>
                </ul>
                <div className="card-body">
                  a couple items
                  {/* insert React-router-dom links instead
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a> */}
                </div>
              </div>
              </ReactCSSTransitionGroup>
            ))}
        </div>
      </div>
    );
  }
}
