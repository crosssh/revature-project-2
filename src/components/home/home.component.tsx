import * as React from "react";

export class HomeComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This is the home Page. It will display some recently posted Pops.
      </div>
    );
  }
}
