import * as React from "react";

export class BoughtComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This is the bought items Page. It will display a user's purchased Pops.
      </div>
    );
  }
}
