import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  addToBids,
  getBuyer,
  putNewBid,
  updateBidPrice,
  updateBidSeller,
  updatePostTimeBid
} from "../../actions/buyer/buyer.actions";
import {
  getBySellerAndTime,
  updateBidder,
  updateCurrentBid
} from "../../actions/product/product.actions";
import { ItemComponent } from "./item.component";

const mapStateToProps = (state: IState) => ({
  buyer: state.buyer,
  product: state.product,
  user: state.user
});

export const mapDispatchToProps = {
  addToBids,
  getBuyer,
  getBySellerAndTime,
  putNewBid,
  updateBidPrice,
  updateBidSeller,
  updateBidder,
  updateCurrentBid,
  updatePostTimeBid
};

export const ItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemComponent);
