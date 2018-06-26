import * as React from "react";
import { IProduct, IUser } from "../../reducers";
import { productInterceptor } from "../../interceptors/product.interceptor";
import { environment } from "../../environment";
import Axios from "axios";
import Dropzone from "react-dropzone";
import { ProfileNavComponent } from "../profile-nav.component";

interface IProp extends IProduct, IUser {
  user: any;
  product: any;
  addProduct: (currentProduct: any) => void;
  reinitializeProduct: () => void;
  setAuctionEnd: (auctionEnd: number) => void;
  setBuyNow: (buyNowPrice: number) => void;
  setMinBid: (minBid: number) => void;
  setTimePosted: (timePosted: number) => void;
  updateCategory: (category: string) => void;
  updateCondition: (condition: string) => void;
  updateError: (errMsg: string) => void;
  updateName: (name: string) => void;
  updatePhotos: (file: any, photos: any[]) => void;
  updatePhotoNames: (fileName: string, photoNames: string[]) => void;
  updateProductUsername: (username: string) => void;
  updateType: (type: string) => void;
}

export class NewPopComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.reinitializeProduct();
    this.props.updateError('');
  }

  public componentWillUnmount() {
    this.props.reinitializeProduct();
    this.props.updateError('');
  }

  public onDrop = (files: any) => {
    const file = files[0];
    console.log(file);

    const url = file.name;
    this.updatePhotoNames(url);
    this.updatePhotos(file);
  };

  public updatePhotos = (file: any) => {
    this.props.updatePhotos(file, this.props.product.photos);
  };

  public updatePhotoNames = (fileName: string) => {
    this.props.updatePhotoNames(
      fileName,
      this.props.product.currentProduct.photoNames
    );
  };

  public sendPhotos = (files: any) => {
    productInterceptor
      .post(environment.context + "product/add-photo/" + files.name)
      .then(resp => {
        Axios.put(resp.data, files)
          .then(uploadResp => {
            this.props.updateError('Uploads successful')
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  public setAuctionEnd = (e: any) => {
    const end = e.target.value;
    this.props.setAuctionEnd(parseInt(end, 10));
  };

  public setBuyNow = (e: any) => {
    const price = e.target.value;
    this.props.setBuyNow(parseInt(price, 10));
  };

  public setMinBid = (e: any) => {
    const minBid = e.target.value;
    this.props.setMinBid(parseInt(minBid, 10));
  };

  public updateCategory = (e: any) => {
    const category = e.target.value;
    this.props.updateCategory(category);
    const username: any = localStorage.getItem('username');
    this.props.updateProductUsername(username);
  };

  public updateCondition = (e: any) => {
    const condition = e.target.value;
    this.props.updateCondition(condition);
  };

  public updateName = (e: any) => {
    const name = e.target.value;
    this.props.updateName(name);
    this.props.updateError("");
  };

  public updateType = (e: any) => {
    const type = e.target.value;
    this.props.updateType(type);
  };

  public addProduct = (e: any) => {
    e.preventDefault();
    for (let i = 0; i < this.props.product.photos.length; i++) {
      console.log(this.props.product.photos[i]);
      this.sendPhotos(this.props.product.photos[i]);
    }
    this.props.addProduct(this.props.product.currentProduct);
  };

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        {localStorage.getItem('token') ?
          <div className="col-10">
            <form onSubmit={this.addProduct}>
              <h3>Post one of your POPS on our site: </h3>
              <div className="row">
                <div className="col">
                  Product Name: <br />
                  <input
                    value={this.props.product.currentProduct.name}
                    type="text"
                    className="product-name form-control"
                    onChange={this.updateName}
                  />{" "}
                  <label>Type of Pop:</label>
                  <select
                    value={this.props.product.currentProduct.type}
                    onChange={this.updateType}
                    className="form-control pop-type"
                    id="FormControlSelect1"
                  >
                    <option value="choose" hidden>
                      Select
                </option>
                    <option value="pop">POP!</option>
                    <option value="vinyl">vinyl/vnyl</option>
                    <option value="keychain">keychain</option>
                    <option value="plush">plush</option>
                    <option value="pocket">pocket</option>
                  </select>
                  <label>Category:</label>
                  <select
                    value={this.props.product.currentProduct.category}
                    onChange={this.updateCategory}
                    className="form-control category"
                    id="FormControlSelect1"
                  >
                    <option value="choose" hidden>
                      Select
                </option>
                    <option value="animation">Animation</option>
                    <option value="games">Games</option>
                    <option value="heroes">Heroes</option>
                    <option value="movies">Movies</option>
                    <option value="music">Music</option>
                    <option value="sports">Sports</option>
                    <option value="Star Wars">Star Wars</option>
                    <option value="television">Television</option>
                    <option value="other">Other</option>
                  </select>
                  <label>Condition:</label>
                  <select
                    value={this.props.product.currentProduct.condition}
                    onChange={this.updateCondition}
                    className="form-control condition"
                    id="FormControlSelect1"
                  >
                    <option value="choose" hidden>
                      Select
                </option>
                    <option value="new">new</option>
                    <option value="opened">opened</option>
                    <option value="damaged">damaged</option>
                    <option value="missing box">missing box</option>
                  </select>
                  Minimum bid price: <br />
                  <input
                    value={this.props.product.currentProduct.minimumBidPrice}
                    type="number"
                    className="min-bid form-control"
                    onChange={this.setMinBid}
                  />{" "}
                  Buy-now price: <br />
                  <input
                    value={this.props.product.currentProduct.buyNowPrice}
                    type="number"
                    className="buy-now-price form-control"
                    onChange={this.setBuyNow}
                  />{" "}
                  Auction length (hours): <br />
                  <input
                    value={this.props.product.currentProduct.auctionEndTime}
                    type="text"
                    className="auction-length form-control"
                    onChange={this.setAuctionEnd}
                  />{" "}
                </div>
                <div className="col">
                  <Dropzone onDrop={this.onDrop}>

                    Drop your files here,
                  <br />
                    or click to select one.
                  <br />
                    Drop or select
                  <br />
                    one file at a time.

              </Dropzone>
                  {this.props.product.currentProduct.photoNames.length > 0 && (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Items Submitted:</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.product.currentProduct.photoNames.map(
                          (file: any) => (
                            <tr key={file}>
                              <td>{file}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  )}
                  <br />
                  <button className="btn btn-success centered" type="submit">
                    Add Product
              </button>
                  <br />
                  <h4 className="italic">{this.props.user.errorMessage}</h4>
                </div>
              </div>
              <br />
              <br />
            </form>
          </div>
          : <h1>With a user account, you can post POPS to sell!</h1>
        }
      </div>
    );
  }
}
