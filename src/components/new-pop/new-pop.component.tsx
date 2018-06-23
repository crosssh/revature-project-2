import * as React from "react";
import { IProduct } from "../../reducers";
import { productInterceptor } from "../../interceptors/product.interceptor";
import { environment } from "../../environment";
import Axios from "axios";
import Dropzone from "react-dropzone";

interface IProp extends IProduct {
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
  updateCurrentBid: (currentBid: number) => void;
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
            alert(uploadResp.status);
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
    this.props.updateProductUsername(this.props.user.username); // idea!
  };

  public setBuyNow = (e: any) => {
    const price = e.target.value;
    this.props.setBuyNow(parseInt(price, 10));
  };

  public setMinBid = (e: any) => {
    const minBid = e.target.value;
    this.props.setMinBid(parseInt(minBid, 10));
    this.props.updateCurrentBid(parseInt(minBid, 10)); // idea!
  };

  public updateCategory = (e: any) => {
    const category = e.target.value;
    this.props.updateCategory(category);
  };

  public updateCondition = (e: any) => {
    const condition = e.target.value;
    this.props.updateCondition(condition);
  };

  public updateName = (e: any) => {
    const name = e.target.value;
    this.props.updateName(name);
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
    // this.props.setTimePosted(Date.now());
    // this.props.updateCurrentBid(this.props.product.currentProduct.minBid);
    // this.props.updateProductUsername(this.props.user.username);
    this.props.addProduct(this.props.product.currentProduct);
  };

  public render() {
    return (
      <div className="container">
        Please enter the information NOW!!!
        <form onSubmit={this.addProduct}>
          <div className="row">
            <div className="col">
              Product Name: <br />
              <input
                value={this.props.product.currentProduct.name}
                type="text"
                className="product-name form-control"
                onChange={this.updateName}
              />{" "}
              <br />
              <label>Type of Pop:</label>
              <br />
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
              <br />
              <label>Category:</label>
              <br />
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
              <br />
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
              <br />
              Minimum bid price: <br />
              <input
                value={this.props.product.currentProduct.minimumBidPrice}
                type="number"
                className="min-bid form-control"
                onChange={this.setMinBid}
              />{" "}
              <br />
              Buy now price: <br />
              <input
                value={this.props.product.currentProduct.buyNowPrice}
                type="number"
                className="buy-now-price form-control"
                onChange={this.setBuyNow}
              />{" "}
              <br />
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
                <p>
                  Drop your files here or click to select one. Drop or select
                  one file at a time.
                </p>
              </Dropzone>
              {/* {
            this.props.product.photos &&

          } */}
              The page could display the names of the uploaded files in a table
              here
            </div>
          </div>
          <br />

          <button className="btn btn-success" type="submit">
            Add Product
          </button>
        </form>
      </div>
    );
  }
}
