import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";

export class SellingComponent extends React.Component<any, any> {
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
        </div>
      </div>
    );
  }
}
