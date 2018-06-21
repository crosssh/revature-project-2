import { connect } from "react-redux";
import { IState } from "../../reducers";
import { getBuyer } from "../../actions/buyer/buyer.actions";
import { BidsComponent } from "./bids.component";

const mapStateToProps = (state: IState) => ({
  buyer: state.buyer,
  user: state.user
});

export const mapDispatchToProps = {
  getBuyer
};

export const BidsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BidsComponent);
