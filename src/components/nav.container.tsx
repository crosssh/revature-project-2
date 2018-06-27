import { connect } from "react-redux";
import { IState } from "./../reducers";
import {
    updateAuthToken,
    updateUsername,
    updateError
} from "./../actions/user/user.actions";
import { NavComponent } from "./nav.component";

const mapStateToProps = (state: IState) => state.user;

export const mapDispatchToProps = {
    updateAuthToken,
    updateError,
    updateUsername
};

export const NavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavComponent);
