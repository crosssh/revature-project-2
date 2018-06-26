import { connect } from "react-redux";
import { IState } from "../../reducers";
import { getBuyer } from "../../actions/buyer/buyer.actions";
import { getBySellerAndTime, reinitializeProduct, updatePhotos } from "../../actions/product/product.actions";
import { BoughtComponent } from "./bought.component";

const mapStateToProps = (state: IState) => ({
  buyer: state.buyer,
  product: state.product,
  user: state.user
});

export const mapDispatchToProps = {
  getBuyer,
  getBySellerAndTime,
  reinitializeProduct,
  updatePhotos
};

export const BoughtContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoughtComponent);
