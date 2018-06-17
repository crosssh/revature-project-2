import * as React from "react";

export class ItemComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public render() {
    return <div> This is a page for an indiviaual item </div>;
  }
}
