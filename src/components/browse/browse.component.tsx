import * as React from "react";

// I guess we don't NEED the interface

export class BrowseComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This is the browse Page. It will display searched Pops.
        <br />
        We have lots of function options to choose from! But what should the
        page display by default?
      </div>
    );
  }
}
