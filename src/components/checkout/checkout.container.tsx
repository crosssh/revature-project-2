import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  addToBought,
  getBuyer,
  putNewBid,
  updateBoughtPrice,
  updateBoughtSeller,
  updateBoughtTime,
  updateItemNameBought,
  updatePostTimeBought
} from "../../actions/buyer/buyer.actions";
import {
  clearItem,
  putProduct,
  updateStatus,
} from "../../actions/product/product.actions";
import { CheckoutComponent } from "./checkout.component";

const mapStateToProps = (state: IState) => ({
  buyer: state.buyer,
  product: state.product,
  user: state.user
});

export const mapDispatchToProps = {
  addToBought,
  clearItem,
  getBuyer,
  putNewBid,
  putProduct,
  updateBoughtPrice,
  updateBoughtSeller,
  updateBoughtTime,
  updateItemNameBought,
  updatePostTimeBought,
  updateStatus
};

export const CheckoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutComponent);
