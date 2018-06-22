import * as React from "react";
import { IProduct } from "../../reducers";
// import { productInterceptor } from "../../interceptors/product.interceptor";
import { environment } from "../../environment";
import Axios from 'axios';

interface IProps extends IProduct {
  getRecent: () => void;
  getUrl: (url: string) => string;
  updateUrl: (url: string) => void;
}

export class HomeComponent extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public componentDidMount() {
    this.getRecent();
  }

  public getRecent = () => {
    this.props.getRecent();
  };

  public getUrl = (filename: string) => {
    console.log(filename)
    Axios.get(environment.context + 'product/get-photo/' + filename)
      .then(resp => {
        this.props.updateUrl(resp.data);
      })
      .catch(err => {
        console.log(err);
      })
    return this.props.url;
  }


  public render() {
    return (
      <div className="container">
        <div className="row">
          {
            this.props.productList.length > 0 &&
            this.props.productList.map((product: any) =>
              <div className="card col-4" key={product.timePosted}>
              <div className="card-title"><h5>{product.name}</h5></div>
                <img className="card-img-top" src={'http://popbay-photo-storage.s3.amazonaws.com/' + product.photos[0]} alt="Card image cap" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Category: {product.category}</li>
                  <li className="list-group-item">Type: {product.type}</li>
                  <li className="list-group-item">Condition: {product.condition}</li>
                </ul>
                <div className="card-body">
                  a couple items 
                  {/* insert React-router-dom links instead
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a> */}
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
