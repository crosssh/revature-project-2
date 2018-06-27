import { connect } from "react-redux";
import { IState } from "../../reducers";
import { clearList, getBySellerAndTime, getSeller, putProduct, updateStatus } from "../../actions/product/product.actions";
import { SellingComponent } from "./selling.component";

const mapStateToProps = (state: IState) => ({
  product: state.product,
  user: state.user
});

export const mapDispatchToProps = {
  clearList,
  getBySellerAndTime,
  getSeller,
  putProduct,
  updateStatus
};

export const SellingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellingComponent);
