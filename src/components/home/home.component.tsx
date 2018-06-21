import * as React from "react";

export class HomeComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public getRecent = (e: any) => {
    this.props.getRecent(); // was there some param?
    // do we need this functino defined right here? Do we need to set the time number based on today? If so, we should do it here.
  };

  public componentDidMount() {
    this.getRecent(15); // figure out what this should be or make the sction need a param
  }

  public render() {
    return (
      <div className="container">
        This is the home Page. It will display some recently posted Pops.
      </div>
    );
  }
}
