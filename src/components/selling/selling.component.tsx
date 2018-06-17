import * as React from "react";

export class SellingComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This page display the items a seller had sold and is selling.
      </div>
    );
  }
}
