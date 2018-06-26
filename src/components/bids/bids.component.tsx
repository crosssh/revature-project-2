import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import { IBuyer, IUser } from "../../reducers";

interface IProp extends IBuyer, IUser {
  buyer: any;
  user: any;
  getBuyer: (username: string) => Promise<any>;
}

export class BidsComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props
      .getBuyer(this.props.user.username)
      .then(resp => {
        console.log("");
      })
      .catch(err => {
        console.log("");
      });
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-10">
          This is the bids Page. {this.props.buyer.currentBuyer.username}'s
          previous bids will be shown here.
          <br />
          We can access them with this.props.buyer.currentBuyer.bids, which is
          an array. We will map the bid data to a table.
          <br />
          <div className="row">
            <div className="col">{this.props.buyer.currentBuyer.username}</div>
            Here is what is stored in bids:
            {/* <div className="col">{this.props.buyer.currentBuyer.bids}</div> */}
          </div>
        </div>
      </div>
    );
  }
}
