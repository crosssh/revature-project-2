import * as React from "react";

export class BidsComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This is the bids Page. A user's previous bids.
      </div>
    );
  }
}
