import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";

export class UserInfoComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-11">
          This page will be a submission page for a new Pop item.
        </div>
      </div>
    );
  }
}
