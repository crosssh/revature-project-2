import * as React from "react";
import { IProduct } from "../../reducers";
import { productInterceptor } from "../../interceptors/product.interceptor";
import { environment } from "../../environment";

interface IProps extends IProduct {
  getRecent: () => void;
  getUrl: (url: string) => string;
}

export class HomeComponent extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public getRecent = () => {
    console.log(this.props.productList)
    this.props.getRecent(); // was there some param?
    // do we need this functino defined right here? Do we need to set the time number based on today? If so, we should do it here.
  };

  public getUrl = (url: string) => {
    console.log(url)
    productInterceptor.get(environment.context + 'product/get-photo/gronk-pop.jpg')
    .then(resp => {
      console.log(resp.data);
      return resp.data;
    })
    .catch(err => {
      console.log(err);
    })
    return "";
  }

  public componentDidMount() {
    console.log(this.props.productList)
    this.getRecent(); // figure out what this should be or make the sction need a param
  }

  public render() {
    return (
      <div className="container">
        {console.log(this.props.productList)}
        <div className="row">
          {
            this.props.productList &&
            this.props.productList.map((product: any) =>
              <div className="card" key={product.timePosted}>
                <img className="card-img-top" src={this.getUrl(product.photos[0])}alt="Card image cap" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Category: {product.category}</li>
                  <li className="list-group-item">Type: {product.type}</li>
                  <li className="list-group-item">Condition: {product.condition}</li>
                </ul>
                <div className="card-body">
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
