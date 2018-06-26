import { connect } from "react-redux";
import { IState } from "../../reducers";
import { clearList, getSeller } from "../../actions/product/product.actions";
import { SellingComponent } from "./selling.component";

const mapStateToProps = (state: IState) => ({
  product: state.product,
  user: state.user
});

export const mapDispatchToProps = {
  clearList,
  getSeller
};

export const SellingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellingComponent);
