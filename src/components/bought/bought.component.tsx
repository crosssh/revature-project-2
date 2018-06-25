import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import { IBuyer, IUser } from "../../reducers";

interface IProp extends IBuyer, IUser {
  buyer: any;
  user: any;
  getBuyer: (username: string) => void;
}

export class BoughtComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public componentDidMount() {
    this.props.getBuyer(this.props.user.username);
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-10">
          This is the bought items Page.{" "}
          {this.props.buyer.currentBuyer.username}'s previously purchased items
          will be shown here.
          <br />
          We can access them with this.props.buyer.currentBuyer.boughtItems,
          which is an array. We will insert a table to make it presentable and
          map the info.
          <br />
          <div className="row">
            <div className="col">{this.props.buyer.currentBuyer.username}</div>
            <div className="col">
              {/* {this.props.buyer.currentBuyer.boughtItems} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
