import * as React from "react";
import { IBuyer, IUser } from "../../reducers";

interface IProp extends IBuyer, IUser {
  buyer: any;
  user: any;
  addToBought: (boughtItem: any, boughtItems: any[]) => void;
  getBuyer: (username: string) => void;
  putNewBid: (currentBuyer: any) => void;
  updateBoughtPrice: (price: number) => void;
  updateBoughtseller: (seller: string) => void;
  updateBoughtTime: (time: number) => void;
  updatePostTimeBought: (time: number) => void;
}

export class CheckoutComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This is the checkout Page.
        <br />
        We need to add lots of the little updating functions, but not the ones
        for Time.
        <br />
        We will call this.props.getBuyer(this.props.user.username)
        <br />
        So that we can this.props.addToBought(this.props.buyer.newBoughtItem,
        this.props.buyer.currentBuyer.boughtItems)
        <br />
        If you think this is kind of a long way to get at things, well, you're
        not wrong.
      </div>
    );
  }
}
