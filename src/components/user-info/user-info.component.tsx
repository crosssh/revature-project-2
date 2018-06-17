import * as React from "react";

export class UserInfoComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This page will be a submission page for a new Pop item.
      </div>
    );
  }
}
