import * as React from "react";

export class BrowseComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return (
      <div className="container">
        This is the browse Page. It will display searched Pops.
      </div>
    );
  }
}
