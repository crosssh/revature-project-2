import * as React from "react";
import { IBuyer, IUser } from "../../reducers";

interface IProp extends IBuyer, IUser {
  buyer: any;
  user: any;
  updateUsername: (username: string) => void;
}

export class CreateUserComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateUsername = (e: any) => {
    const username = e.target.value;
    this.props.updateUsername(username);
  };

  public render() {
    return (
      <div>
        This will be the create user form.
        <br />
        Also don't forget to do the new buyer thing to the db on account
        creation.
      </div>
    );
  }
}
