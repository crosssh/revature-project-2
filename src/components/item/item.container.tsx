import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  addToBids,
  getBuyer,
  putNewBid,
  updateBidPrice,
  updateBidSeller,
  updatePostTimeBid,
  updateHighest
} from "../../actions/buyer/buyer.actions";
import { getBySellerAndTime } from "../../actions/product/product.actions";
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
  updateHighest,
  updatePostTimeBid
};

export const ItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemComponent);
