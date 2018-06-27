import { connect } from "react-redux";
import { IState } from "../../reducers";
import { getBuyer } from "../../actions/buyer/buyer.actions";
import { clearItem, getBySellerAndTime, reinitializeProduct, updatePhotos } from "../../actions/product/product.actions";
import { BidsComponent } from "./bids.component";

const mapStateToProps = (state: IState) => ({
  buyer: state.buyer,
  product: state.product,
  user: state.user
});

export const mapDispatchToProps = {
  clearItem,
  getBuyer,
  getBySellerAndTime,
  reinitializeProduct,
  updatePhotos
};

export const BidsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BidsComponent);
