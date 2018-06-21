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

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-11">
          This is the bought items Page. A user's previously purchased items.
          <br />
          We can access them with this.props.buyer.currentBuyer.boughtItems,
          which is an array, after we call
          this.props.getBuyer(this.props.user.username);
        </div>
      </div>
    );
  }
}
