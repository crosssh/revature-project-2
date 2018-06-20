import * as React from "react";
import { IProduct } from "../../reducers";

interface IProp extends IProduct {

  addProduct: (currentProduct: any) => void;
  setAuctionEnd: (auctionEnd: number) => void;
  setBuyNow: (buyNowPrice: number) => void;
  setMinBid: (minBid: number) => void;
  setTimePosted: (timePosted: number) => void;
  updateCategory: (category: string) => void;
  updateCondition: (condition: string) => void;
  updateCurrentBid: (currentBid: number) => void;
  updateName: (name: string) => void;
  updatePhotos: (photos: string) => void;
  updateProductUsername: (username: string) => void; 
  updateType: (type: string) => void;

}

export class NewPopComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  
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
  };

  public updateCondition = (e: any) => {
    const condition = e.target.value;
    this.props.updateCondition(condition);
  };

  public updateCurrentBid = (e: any) => {
    const currentBid = e.target.value;
    this.props.updateCurrentBid(currentBid);
  };

  public updateName = (e: any) => {
    const name = e.target.value
    this.props.updateName(name);
  };

  public updatePhotos = (e: any) => {
    const photos = e.target.value;
    this.props.updatePhotos(photos)
  };

  public updateType = (e: any) => {
    const type = e.target.value;
    this.props.updateType(type);
  };

  public addProduct = (e: any) => {
    // e.preventDefault();
    this.props.setTimePosted(Date.now());
    this.props.updateCurrentBid(this.props.currentProduct.minBid);
    this.props.updateProductUsername('Crosssh');
    this.props.addProduct(this.props.currentProduct);
  }

  public render() {
    return (
      <div className="container">
      Please enter the infromation NOW!!!!!
        <form onSubmit={this.addProduct}>
          Product Name: <br />
          <input type="text" className="product-name" onChange={this.updateName}/> <br/>
          Type of Pop: <br />
          <input type="text" className="pop-type" onChange={this.updateType}/> <br/>
          category: <br />
          <input type="text" className="category" onChange={this.updateCategory}/> <br/>
          Condition: <br />
          <input type="text" className="condition" onChange={this.updateCondition}/> <br/>
          Minimum bid price: <br />
          <input type="number" className="min-bid" onChange={this.setMinBid}/> <br/>
          Buy now price: <br />
          <input type="number" className="buy-now-price" onChange={this.setBuyNow}/> <br/>
          Auction length: <br />
          <input type="text" className="auction-length" onChange={this.setAuctionEnd}/> <br/>
          <button type="submit">Add Product</button>
        </form>
      </div >
    );
  }
}


// currentProduct: {
//   "auctionEndTime": 0,
//   "buyNowPrice": 0,
//   "category": "",
//   "condition": "",
//   "currentBidder": "",
//   "currentBidPrice": 0,
//   "minimumBidPrice": 0,
//   "name": "",
//   "photos": "",
//   "status": "",
//   "timePosted": 0,
//   "type": "",
//   "username": ""
// }