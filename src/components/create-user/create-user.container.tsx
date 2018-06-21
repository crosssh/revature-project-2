import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  updateAuthToken,
  updateUsername,
  updateError
} from "../../actions/user/user.actions";
import { postNewBuyer } from "../../actions/buyer/buyer.actions";
import { CreateUserComponent } from "./create-user.component";

const mapStateToProps = (state: IState) => ({
  buyer: state.buyer,
  user: state.user
});

export const mapDispatchToProps = {
  postNewBuyer,
  updateAuthToken,
  updateError,
  updateUsername
};

export const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserComponent);
