import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
// import * as awsCognito from "amazon-cognito-identity-js";

export class UserInfoComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  // public getCognitoUser= () => {
  //   const poolData = {
  //     ClientId: "5gpn6c10oppbml3hjva90nrjgf", // Your client id here
  //     UserPoolId: "us-west-2_S3BP7tO7z" // Your user pool id here
  //   };
  //   const userPool = new awsCognito.CognitoUserPool(poolData);
  //   const cognitoUser = userPool.getCurrentUser();
  //   cognitoUser.getUserAttributes(function(err, resp) {
  //     if(err) {
  //       return err;
  //     }

  //     return resp;
  //   });

  //   return cognitoUser;
  // }


  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-10">
          <div className="container">
          </div>
        </div>
      </div>
    );
  }
}
