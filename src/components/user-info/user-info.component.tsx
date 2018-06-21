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
          This page will show a user's account information: name, email,
          username, and possibly password.
          <br />
          But I admit I'm not sure how to get it out of the authentication
          token.
          <br />
          Also the update error function is available here in the event that we
          want to display some conditional message, even if it's not an error.
        </div>
      </div>
    );
  }
}
