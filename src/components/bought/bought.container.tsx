import { connect } from "react-redux";
import { IState } from "../../reducers";
import { getBuyer } from "../../actions/buyer/buyer.actions";
import { BoughtComponent } from "./bought.component";

const mapStateToProps = (state: IState) => ({
  buyer: state.buyer,
  user: state.user
});

export const mapDispatchToProps = {
  getBuyer
};

export const BoughtContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoughtComponent);
