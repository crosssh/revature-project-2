import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import { IProduct, IUser } from "../../reducers";

interface IProp extends IProduct, IUser {
  product: any;
  user: any;
  getSeller: (username: string) => void;
}

export class SellingComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-11">
          This page display the items a seller had sold and is selling.
          <br />
          we can retreive them with the function
          this.props.getSeller(this.props.user.username) and we will then
          display the array this.props.product.productList[]
        </div>
      </div>
    );
  }
}
