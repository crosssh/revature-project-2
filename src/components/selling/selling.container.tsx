import { connect } from "react-redux";
import { IState } from "../../reducers";
import { getSeller } from "../../actions/product/product.actions";
import { SellingComponent } from "./selling.component";

const mapStateToProps = (state: IState) => ({
  product: state.product,
  user: state.user
});

export const mapDispatchToProps = {
  getSeller
};

export const SellingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellingComponent);
