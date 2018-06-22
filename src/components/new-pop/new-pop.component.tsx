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
  setAuctionEnd: (auctionEnd: number) => void;
  setBuyNow: (buyNowPrice: number) => void;
  setMinBid: (minBid: number) => void;
  setTimePosted: (timePosted: number) => void;
  updateCategory: (category: string) => void;
  updateCondition: (condition: string) => void;
  updateCurrentBid: (currentBid: number) => void;
  updateName: (name: string) => void;
  updatePhotos: (url: string, photos: string[]) => void;
  updateProductUsername: (username: string) => void;
  updateType: (type: string) => void;
}

export class NewPopComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
  }

  public onDrop = (files: any) => {
    const file = files[0];
    console.log(file);

    const url = environment.context + "product/add-photo/" + file.name;
    this.updatePhotos(url);
  };

  public updatePhotos = (url: string) => {
    this.props.updatePhotos(url, this.props.product.currentProduct.photos);
  };

  public sendPhotos = (files: any) => {
    // maybe I should say string
    // const file = files[0];

    productInterceptor
      .post(files)
      // (environment.context + "product/add-photo/" + file.name)
      .then(resp => {
        Axios.put(resp.data, files) // added s
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

  // public updateCurrentBid = (e: any) => { // actually don't need it anyway
  //   const currentBid = e.target.value;
  //   this.props.updateCurrentBid(currentBid);
  // };

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
    for (let i = 0; i < this.props.product.currentProduct.photos.length; i++) {
      console.log(this.props.product.currentProduct.photos[i]);
      this.sendPhotos(this.props.product.currentProduct.photos[i]);
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
          Product Name: <br />
          <input
            value={this.props.product.currentProduct.name}
            type="text"
            className="product-name"
            onChange={this.updateName}
          />{" "}
          <br />
          Type of Pop: (make this a dropdown)<br />
          <input
            value={this.props.product.currentProduct.type}
            type="text"
            className="pop-type"
            onChange={this.updateType}
          />{" "}
          <br />
          Category: (make this a dropdown)<br />
          <input
            value={this.props.product.currentProduct.category}
            type="text"
            className="category"
            onChange={this.updateCategory}
          />{" "}
          <br />
          Condition: (make this a dropdown) <br />
          <input
            value={this.props.product.currentProduct.condition}
            type="text"
            className="condition"
            onChange={this.updateCondition}
          />{" "}
          <br />
          Minimum bid price: <br />
          <input
            value={this.props.product.currentProduct.minimumBidPrice}
            type="number"
            className="min-bid"
            onChange={this.setMinBid}
          />{" "}
          <br />
          Buy now price: <br />
          <input
            value={this.props.product.currentProduct.buyNowPrice}
            type="number"
            className="buy-now-price"
            onChange={this.setBuyNow}
          />{" "}
          <br />
          Auction length (hours): <br />
          <input
            value={this.props.product.currentProduct.auctionEndTime}
            type="text"
            className="auction-length"
            onChange={this.setAuctionEnd}
          />{" "}
          <br />
          <br />
          <Dropzone onDrop={this.onDrop}>
            <p>
              Drop your files here or click to select one. Drop or select one
              file at a time.
            </p>
          </Dropzone>
          <br />
          The page could display the names of the uploaded files...
          <button className="btn btn-success" type="submit">
            Add Product
          </button>
        </form>
      </div>
    );
  }
}
