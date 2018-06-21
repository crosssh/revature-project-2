import { connect } from "react-redux";
import { IState } from "../../reducers";
import { UserInfoComponent } from "./user-info.component";
import { updateError } from "../../actions/user/user.actions";

const mapStateToProps = (state: IState) => state.user;

export const mapDispatchToProps = {
  updateError
};

export const UserInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoComponent);
