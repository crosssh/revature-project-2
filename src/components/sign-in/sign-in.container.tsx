import { connect } from "react-redux";
import { IState } from "../../reducers";
import { SignInComponent } from "./sign-in.component";
import {
  updateAuthToken,
  updateUsername,
  updateError
} from "../../actions/user/user.actions";

const mapStateToProps = (state: IState) => state.user;

export const mapDispatchToProps = {
  updateAuthToken,
  updateError,
  updateUsername
};

export const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInComponent);
