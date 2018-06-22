import { connect } from "react-redux";
import { IState } from "../../reducers";
import { reinitializeBuyer  } from "../../actions/buyer/buyer.actions";
import { reinitializeProduct  } from "../../actions/product/product.actions";
import { reinitializeUser  } from "../../actions/user/user.actions";
import { SignOutComponent } from "./sign-out.component";

const mapStateToProps = (state: IState) => ({buyer:state.buyer, product: state.product, user: state.user});

export const mapDispatchToProps = {
  reinitializeBuyer,
  reinitializeProduct,
  reinitializeUser
  // logout function
};

export const SignOutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutComponent);
