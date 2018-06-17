import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";

export class BoughtComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-11">
          This is the bought items Page. It will display a user's purchased Pops.
        </div>
      </div>
    );
  }
}