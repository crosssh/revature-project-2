import * as React from "react";
import { IProduct } from "../../reducers";
interface IProp extends IProduct {

  addProduct: (currentProduct: any) => void;
  setAuctionEnd: (auctionEnd: number) => void;
  setBuyNow: (buyNowPrice: number) => void;
  setMinBid: (minBid: number) => void;
  setTimePosted: (timePosted: number) => void;
  updateBidder: (bidder: string) => void;
  updateCategory: (category: string) => void;
  updateCondition: (condition: string) => void;
  updateCurrentBid: (currentBid: number) => void;
  updateName: (name: string) => void;
  updatePhotos: (photos: string) => void;
  updateStatus: (status: string) => void;
  updateType: (type: string) => void;

}

export class NewPopComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This page will be a submission page for a new Pop item.
      </div>
    );
  }
}
